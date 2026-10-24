require("dotenv").config();
const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getTestUser() {
  // هنجيب أول مستخدم موجود في جدول Profile
  const { data, error } = await supabase
    .from("Profile")
    .select("user_id, email") // عدّلي أسماء الأعمدة لو مختلفة عندك
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("مفيش أي مستخدم في جدول Profile، اعملي واحد الأول");

  console.log("User found:", data);
  return data;
}

// async function getTestPrice() {
//   // هنجيب أول price نشط في test mode
//   const prices = await stripe.prices.list({
//     active: true,
//     limit: 1,
//     expand: ["data.product"],
//   });

//   if (prices.data.length === 0) {
//     throw new Error("مفيش أي price نشط في test mode، اعملي Product الأول من Stripe Dashboard");
//   }

//   const price = prices.data[0];
//   const product = price.product;

//   console.log("Price found:", price.id, "-", product.name, "-", price.unit_amount / 100, price.currency);
//   return price;
// }
async function getTestPrice() {
  const price = await stripe.prices.retrieve("price_1TcZIVLzpaVNOCuhQZa8aLfl");
  console.log("Price found:", price.id, "-", price.recurring.interval, "-", price.unit_amount / 100, price.currency);
  return price;
}
// async function testRenewal() {
//   // 0) هات بيانات حقيقية
//   const user = await getTestUser();
//   const price = await getTestPrice();

//   // 1) اعملي test clock
//   // const testClock = await stripe.testHelpers.testClocks.create({
//   //   frozen_time: Math.floor(Date.now() / 1000),
//   //   name: "renewal-test",
//   // });
//    const testClock = await stripe.testHelpers.testClocks.create({
//     frozen_time: Math.floor(Date.now() / 1000),
//     name: "renewal-unpaid-test",
//   });
//   console.log("Test clock created:", testClock.id);

//   // 2) اعملي customer مربوط بالـ clock، بإيميل المستخدم الحقيقي
//   const customer = await stripe.customers.create({
//     email: user.email,
//     payment_method: "pm_card_visa_chargeDeclinedInsufficientFunds", // test card جاهزة من Stripe، ثابتة لأي حساب test mode
//     // payment_method: "pm_card_visa", // test card جاهزة من Stripe، ثابتة لأي حساب test mode
//     invoice_settings: { default_payment_method: "pm_card_visa_chargeDeclinedInsufficientFunds" },
//     // invoice_settings: { default_payment_method: "pm_card_visa" },
//     test_clock: testClock.id,
//   });
//   console.log("Customer created:", customer.id);

//   // 3) اعملي subscription ببيانات حقيقية
//   const subscription = await stripe.subscriptions.create({
//     customer: customer.id,
//     items: [{ price: price.id }],
//     metadata: {
//       user_id: user.user_id,
//     },
//   });
//   console.log("Subscription created:", subscription.id);

//   // استني شوية عشان أول webhooks توصل
//   await new Promise((r) => setTimeout(r, 5000));

//   // 4) قدّمي الساعة لبعد نهاية الفترة (سيناريو الـ renewal)
//   console.log("Advancing clock to trigger renewal...");
//   // await stripe.testHelpers.testClocks.advance(testClock.id, {
//   //   frozen_time: subscription.current_period_end + 3600,
//   // });
//     await stripe.testHelpers.testClocks.advance(testClock.id, {
//     frozen_time: subscription.current_period_end + 3 * 24 * 3600,
//   });

//   // 5) استني لحد ما تخلص processing
//   let clock = await stripe.testHelpers.testClocks.retrieve(testClock.id);
//   while (clock.status !== "ready") {
//     console.log("Clock status:", clock.status, "... waiting");
//     await new Promise((r) => setTimeout(r, 3000));
//     // await new Promise((r) => setTimeout(r, 2000));
//     clock = await stripe.testHelpers.testClocks.retrieve(testClock.id);
//   }

//   console.log("✅ Done! روحي شوفي:");
//   console.log("- Stripe Dashboard > Webhooks > Event deliveries");
//   console.log("- Supabase > Table Editor > subscriptions / payments");
// }
// case past_due / unpaid
async function testRenewal() {
  const user = await getTestUser();
  const price = await getTestPrice();

  const testClock = await stripe.testHelpers.testClocks.create({
    frozen_time: Math.floor(Date.now() / 1000),
    name: "renewal-unpaid-test",
  });
  console.log("Test clock created:", testClock.id);

  // -----------------------------------------------
  // 1) اعملي customer بكارت شغال عادي
  // -----------------------------------------------
  const customer = await stripe.customers.create({
    email: user.email,
    payment_method: "pm_card_visa",
    invoice_settings: { default_payment_method: "pm_card_visa" },
    test_clock: testClock.id,
  });
  console.log("Customer created:", customer.id);

  // -----------------------------------------------
  // 2) اعملي subscription - هتدفع بنجاح بالكارت الشغال
  // -----------------------------------------------
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: price.id }],
    metadata: { user_id: user.user_id },
  });
  console.log("Subscription created:", subscription.id);

  await new Promise((r) => setTimeout(r, 5000));

  // -----------------------------------------------
  // 3) دلوقتي بدّلي الكارت الافتراضي بالكارت الفاشل
  //    قبل ما التجديد يحصل
  // -----------------------------------------------
  const failingPaymentMethod = await stripe.paymentMethods.attach(
    "pm_card_chargeCustomerFail",
    { customer: customer.id }
  );

  await stripe.customers.update(customer.id, {
    invoice_settings: {
      default_payment_method: failingPaymentMethod.id,
    },
  });

  console.log("Switched to failing card for renewal test");

  // -----------------------------------------------
  // 4) قدّمي الساعة لبعد نهاية الفترة + فترة الـ retries
  // -----------------------------------------------
  console.log("Advancing clock past renewal + retry window...");
  await stripe.testHelpers.testClocks.advance(testClock.id, {
    frozen_time: subscription.current_period_end + 3 * 24 * 3600,
  });

  let clock = await stripe.testHelpers.testClocks.retrieve(testClock.id);
  while (clock.status !== "ready") {
    console.log("Clock status:", clock.status, "... waiting");
    await new Promise((r) => setTimeout(r, 3000));
    clock = await stripe.testHelpers.testClocks.retrieve(testClock.id);
  }

  const finalSub = await stripe.subscriptions.retrieve(subscription.id);
  console.log("✅ Final subscription status:", finalSub.status);
  console.log("- Stripe Dashboard > Webhooks > Event deliveries");
  console.log("- Supabase > Table Editor > subscriptions / payments / Profile");
}

testRenewal().catch((err) => console.error("❌ Error:", err.message));