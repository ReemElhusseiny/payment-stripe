import { 
  Zap, 
  Star, 
  Crown, 
  FileSpreadsheet, 
  GitMerge, 
  BarChart3, 
  Calculator, 
} from 'lucide-react';
export interface PlanFeature {
  text: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  duration: string;
  price: number;
  monthlyEquivalent: string;
  icon: React.ElementType;
  badge?: string;
  discountBadge?: string;
  isPopular?: boolean;
  features: PlanFeature[];
  priceId: string;
}

export const PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    title: 'Monthly',
    duration: '1 month access',
    price: 50,
    monthlyEquivalent: '$50.00 / month',
    icon: Zap,
    badge: 'Flexible',
    priceId: "price_1TcZIVLzpaVNOCuhQZa8aLfl",
    features: [
      { text: 'All core tools' },
      { text: 'Monthly flexibility' },
      { text: 'Email support' }
    ]
  },
  {
    id: 'semi-annual',
    title: 'Semi-Annual',
    duration: '6 months access',
    price: 240,
    monthlyEquivalent: '$40.00 / month',
    icon: Star,
    badge: 'MOST POPULAR',
    discountBadge: 'Save 20%',
    isPopular: true,
    priceId: "price_1TmJliLzpaVNOCuhKFegjG1c",
    features: [
      { text: 'Everything in Monthly' },
      { text: 'Priority support' },
      { text: 'Save $60 every cycle' }
    ],
  },
  {
    id: 'annual',
    title: 'Annual',
    duration: '12 months access',
    price: 360,
    monthlyEquivalent: '$30.00 / month',
    icon: Crown,
    discountBadge: 'Best value',
      priceId: "price_1TmJmnLzpaVNOCuhBfdMdzrQ",
    features: [
      { text: 'Everything in Semi-Annual' },
      { text: 'Dedicated success support' },
      { text: 'Save $240 every year' }
    ]
  }
];

export const FEATURE_PILLS = [
  { label: 'Excel Auto-Split', icon: FileSpreadsheet },
  { label: 'Merge & Edit', icon: GitMerge },
  { label: 'Financial Reports', icon: BarChart3 },
  { label: 'Accounting Ops', icon: Calculator }
];