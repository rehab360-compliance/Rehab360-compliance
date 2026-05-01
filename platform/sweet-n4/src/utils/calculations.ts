import type { Recipe, RecipeCalculation, Event, EventCalculation, BusinessSummary, Overhead, PricingScenario, ComparisonMetric } from '../types';

/**
 * Calculate total ingredient cost for a recipe
 */
export function calculateIngredientCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((total, ingredient) => {
    return total + (ingredient.cost * ingredient.quantityUsed);
  }, 0);
}

/**
 * Calculate total labour cost for a recipe batch
 */
export function calculateLabourCost(recipe: Recipe): number {
  return recipe.labourHours * recipe.labourRate;
}

/**
 * Calculate total COGS (Cost of Goods Sold) for a recipe batch
 */
export function calculateTotalCOGS(recipe: Recipe): number {
  const ingredientCost = calculateIngredientCost(recipe);
  const labourCost = calculateLabourCost(recipe);
  return ingredientCost + recipe.packagingCost + labourCost;
}

/**
 * Calculate cost per unit (single item)
 */
export function calculateCostPerUnit(recipe: Recipe): number {
  const totalCOGS = calculateTotalCOGS(recipe);
  return recipe.batchSize > 0 ? totalCOGS / recipe.batchSize : 0;
}

/**
 * Calculate gross profit for a recipe batch
 */
export function calculateGrossProfit(recipe: Recipe): number {
  const revenue = recipe.sellingPrice * recipe.batchSize;
  const totalCOGS = calculateTotalCOGS(recipe);
  return revenue - totalCOGS;
}

/**
 * Calculate gross profit margin as percentage
 */
export function calculateGrossMargin(recipe: Recipe): number {
  const revenue = recipe.sellingPrice * recipe.batchSize;
  if (revenue === 0) return 0;
  const grossProfit = calculateGrossProfit(recipe);
  return (grossProfit / revenue) * 100;
}

/**
 * Perform full recipe calculation
 */
export function calculateRecipe(recipe: Recipe): RecipeCalculation {
  const totalIngredientCost = calculateIngredientCost(recipe);
  const totalLabourCost = calculateLabourCost(recipe);
  const totalPackagingCost = recipe.packagingCost;
  const totalCOGS = totalIngredientCost + totalPackagingCost + totalLabourCost;
  const costPerUnit = recipe.batchSize > 0 ? totalCOGS / recipe.batchSize : 0;
  const revenue = recipe.sellingPrice * recipe.batchSize;
  const grossProfit = revenue - totalCOGS;
  const grossMarginPercent = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  
  return {
    recipe,
    totalIngredientCost,
    totalPackagingCost,
    totalLabourCost,
    totalCOGS,
    costPerUnit,
    grossProfit,
    grossMarginPercent,
    netProfit: grossProfit, // For recipe level, net = gross
    netMarginPercent: grossMarginPercent,
  };
}

/**
 * Calculate event profitability
 */
export function calculateEvent(event: Event): EventCalculation {
  const grossProfit = event.revenue - event.cogs;
  const grossMarginPercent = event.revenue > 0 ? (grossProfit / event.revenue) * 100 : 0;
  
  return {
    event,
    grossProfit,
    grossMarginPercent,
  };
}

/**
 * Calculate business summary across all events and overheads
 */
export function calculateBusinessSummary(events: Event[], overheads: Overhead[]): BusinessSummary {
  const eventCalculations = events.map(calculateEvent);
  
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const totalCOGS = events.reduce((sum, event) => sum + event.cogs, 0);
  const totalGrossProfit = totalRevenue - totalCOGS;
  const totalOverheads = overheads.reduce((sum, overhead) => sum + overhead.amount, 0);
  const trueNetProfit = totalGrossProfit - totalOverheads;
  const trueNetMarginPercent = totalRevenue > 0 ? (trueNetProfit / totalRevenue) * 100 : 0;
  
  return {
    totalRevenue,
    totalCOGS,
    totalGrossProfit,
    totalOverheads,
    trueNetProfit,
    trueNetMarginPercent,
    events: eventCalculations,
    overheads,
  };
}

/**
 * Suggest price optimization based on target margin
 */
export function suggestPriceOptimization(recipe: Recipe, targetMargin: number = 60): PricingScenario {
  const calculation = calculateRecipe(recipe);
  const costPerUnit = calculation.costPerUnit;
  
  // Calculate price needed to achieve target margin
  // Formula: price = cost / (1 - targetMargin/100)
  const suggestedPrice = costPerUnit / (1 - targetMargin / 100);
  const priceIncrease = suggestedPrice - recipe.sellingPrice;
  const priceIncreasePercent = recipe.sellingPrice > 0 
    ? (priceIncrease / recipe.sellingPrice) * 100 
    : 0;
  
  let reasoning = '';
  if (calculation.grossMarginPercent < targetMargin) {
    reasoning = `Current margin (${calculation.grossMarginPercent.toFixed(1)}%) is below target (${targetMargin}%). Increase price to improve profitability.`;
  } else if (calculation.grossMarginPercent > targetMargin + 10) {
    reasoning = `Current margin (${calculation.grossMarginPercent.toFixed(1)}%) exceeds target significantly. Consider maintaining price or testing market elasticity.`;
  } else {
    reasoning = `Current margin (${calculation.grossMarginPercent.toFixed(1)}%) is near target (${targetMargin}%). Price is optimized.`;
  }
  
  return {
    recipeId: recipe.id,
    recipeName: recipe.name,
    currentPrice: recipe.sellingPrice,
    currentMargin: calculation.grossMarginPercent,
    suggestedPrice,
    suggestedMargin: targetMargin,
    priceIncrease,
    priceIncreasePercent,
    reasoning,
  };
}

/**
 * Compare multiple recipes for profitability
 */
export function compareRecipes(recipes: Recipe[]): ComparisonMetric[] {
  return recipes.map(recipe => {
    const calculation = calculateRecipe(recipe);
    return {
      recipeId: recipe.id,
      recipeName: recipe.name,
      costPerUnit: calculation.costPerUnit,
      sellingPrice: recipe.sellingPrice,
      grossMargin: calculation.grossMarginPercent,
      netMargin: calculation.netMarginPercent,
    };
  }).sort((a, b) => b.grossMargin - a.grossMargin);
}

/**
 * Format currency in ZAR
 */
export function formatCurrency(amount: number): string {
  return `R${amount.toFixed(2)}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Validate recipe data
 */
export function validateRecipe(recipe: Partial<Recipe>): string[] {
  const errors: string[] = [];
  
  if (!recipe.name || recipe.name.trim() === '') {
    errors.push('Recipe name is required');
  }
  
  if (!recipe.batchSize || recipe.batchSize <= 0) {
    errors.push('Batch size must be greater than 0');
  }
  
  if (!recipe.sellingPrice || recipe.sellingPrice <= 0) {
    errors.push('Selling price must be greater than 0');
  }
  
  if (!recipe.labourRate || recipe.labourRate < 0) {
    errors.push('Labour rate cannot be negative');
  }
  
  if (!recipe.labourHours || recipe.labourHours < 0) {
    errors.push('Labour hours cannot be negative');
  }
  
  if (recipe.packagingCost !== undefined && recipe.packagingCost < 0) {
    errors.push('Packaging cost cannot be negative');
  }
  
  return errors;
}
