export default function CheckoutExpiredUI({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="text-center max-w-md">

        <h1 className="text-3xl font-bold">
          Payment Session Expired
        </h1>

        <p className="mt-3 text-gray-500">
          Your checkout session has expired.
          Please start a new payment.
        </p>

        <button
          onClick={onRetry}
          className="mt-8 w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white"
        >
          Choose a Plan
        </button>

      </div>

    </div>
  );
}