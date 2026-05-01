// Recipe and ingredient types
export interface Ingredient {
  id: string;
  name: string;
  cost: number; // Cost per unit
  unit: string; // kg, litre, piece, etc.
  quantityUsed: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'juice-blend' | 'boli' | 'elephant-ear';
  batchSize: number; // Number of units produced
  ingredients: Ingredient[];
  packagingCost: number;
  labourHours: number;
  labourRate: number; // ZAR per hour
  sellingPrice: number;
}

export interface RecipeCalculation {
  recipe: Recipe;
  totalIngredientCost: number;
  totalPackagingCost: number;
  totalLabourCost: number;
  totalCOGS: number; // Cost of Goods Sold
  costPerUnit: number;
  grossProfit: number;
  grossMarginPercent: number;
  netProfit: number;
  netMarginPercent: number;
}

// Event tracking types
export interface Event {
  id: string;
  name: string;
  date: string;
  revenue: number;
  cogs: number; // Total cost of goods sold for this event
  notes?: string;
}

export interface Overhead {
  id: string;
  category: string;
  description: string;
  amount: number;
  period: 'monthly' | 'per-event';
}

export interface EventCalculation {
  event: Event;
  grossProfit: number;
  grossMarginPercent: number;
}

export interface BusinessSummary {
  totalRevenue: number;
  totalCOGS: number;
  totalGrossProfit: number;
  totalOverheads: number;
  trueNetProfit: number;
  trueNetMarginPercent: number;
  events: EventCalculation[];
  overheads: Overhead[];
}

// Pricing optimization types
export interface PricingScenario {
  recipeId: string;
  recipeName: string;
  currentPrice: number;
  currentMargin: number;
  suggestedPrice: number;
  suggestedMargin: number;
  priceIncrease: number;
  priceIncreasePercent: number;
  reasoning: string;
}

export interface ComparisonMetric {
  recipeId: string;
  recipeName: string;
  costPerUnit: number;
  sellingPrice: number;
  grossMargin: number;
  netMargin: number;
  unitsSoldEstimate?: number;
  totalProfit?: number;
}
