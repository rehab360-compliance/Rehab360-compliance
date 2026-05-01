import type { Recipe, Event, Overhead } from '../types';

// Sample recipes based on Sweet N 4 signature products
export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pineapple Ginger Juice Blend',
    category: 'juice-blend',
    batchSize: 4, // 4 x 250ml servings
    ingredients: [
      { id: 'i1', name: 'Pineapple', cost: 20, unit: '1.5kg', quantityUsed: 0.5 },
      { id: 'i2', name: 'Ginger', cost: 15, unit: '200g', quantityUsed: 0.25 },
      { id: 'i3', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.1 },
      { id: 'i4', name: 'Salt', cost: 10, unit: '1kg', quantityUsed: 0.004 }, // 4g
    ],
    packagingCost: 5, // Cups and lids
    labourHours: 0.5,
    labourRate: 50,
    sellingPrice: 25,
  },
  {
    id: '2',
    name: 'Strawberry Boli (Frozen Pops)',
    category: 'boli',
    batchSize: 12,
    ingredients: [
      { id: 'i5', name: 'Strawberries', cost: 35, unit: '500g', quantityUsed: 1 },
      { id: 'i6', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.15 },
      { id: 'i7', name: 'Water', cost: 0, unit: 'litre', quantityUsed: 1 },
    ],
    packagingCost: 12, // 12 plastic bags
    labourHours: 0.75,
    labourRate: 50,
    sellingPrice: 10,
  },
  {
    id: '3',
    name: 'Classic Fried Elephant Ears',
    category: 'elephant-ear',
    batchSize: 6,
    ingredients: [
      { id: 'i8', name: 'Flour', cost: 30, unit: '2.5kg', quantityUsed: 0.5 },
      { id: 'i9', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.2 },
      { id: 'i10', name: 'Butter', cost: 45, unit: '500g', quantityUsed: 0.1 },
      { id: 'i11', name: 'Eggs', cost: 45, unit: '18 pack', quantityUsed: 0.17 }, // 3 eggs
      { id: 'i12', name: 'Cooking Oil', cost: 60, unit: '2L', quantityUsed: 0.3 },
    ],
    packagingCost: 6, // Paper bags
    labourHours: 1,
    labourRate: 50,
    sellingPrice: 35,
  },
  {
    id: '4',
    name: 'Citrus Burst Juice Blend',
    category: 'juice-blend',
    batchSize: 4,
    ingredients: [
      { id: 'i13', name: 'Oranges', cost: 30, unit: '2kg', quantityUsed: 0.75 },
      { id: 'i14', name: 'Lemons', cost: 20, unit: '1kg', quantityUsed: 0.25 },
      { id: 'i15', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.075 },
      { id: 'i16', name: 'Salt', cost: 10, unit: '1kg', quantityUsed: 0.004 },
    ],
    packagingCost: 5,
    labourHours: 0.5,
    labourRate: 50,
    sellingPrice: 25,
  },
  {
    id: '5',
    name: 'Mango Boli',
    category: 'boli',
    batchSize: 12,
    ingredients: [
      { id: 'i17', name: 'Mangoes', cost: 40, unit: '1kg', quantityUsed: 1.5 },
      { id: 'i18', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.12 },
      { id: 'i19', name: 'Water', cost: 0, unit: 'litre', quantityUsed: 1 },
    ],
    packagingCost: 12,
    labourHours: 0.75,
    labourRate: 50,
    sellingPrice: 12,
  },
  {
    id: '6',
    name: 'Cinnamon Sugar Elephant Ears',
    category: 'elephant-ear',
    batchSize: 6,
    ingredients: [
      { id: 'i20', name: 'Flour', cost: 30, unit: '2.5kg', quantityUsed: 0.5 },
      { id: 'i21', name: 'Sugar', cost: 25, unit: '2kg', quantityUsed: 0.25 },
      { id: 'i22', name: 'Butter', cost: 45, unit: '500g', quantityUsed: 0.1 },
      { id: 'i23', name: 'Eggs', cost: 45, unit: '18 pack', quantityUsed: 0.17 },
      { id: 'i24', name: 'Cooking Oil', cost: 60, unit: '2L', quantityUsed: 0.3 },
      { id: 'i25', name: 'Cinnamon', cost: 40, unit: '100g', quantityUsed: 0.2 },
    ],
    packagingCost: 6,
    labourHours: 1,
    labourRate: 50,
    sellingPrice: 38,
  },
];

// Sample events
export const sampleEvents: Event[] = [
  {
    id: 'e1',
    name: 'Saturday Market - Green Point',
    date: '2026-04-26',
    revenue: 2450,
    cogs: 980,
    notes: 'High foot traffic, sold out by 2pm',
  },
  {
    id: 'e2',
    name: "Children's Birthday Party",
    date: '2026-04-28',
    revenue: 1800,
    cogs: 720,
    notes: 'Private catering order - 50 guests',
  },
  {
    id: 'e3',
    name: 'Sunday Market - Waterfront',
    date: '2026-04-29',
    revenue: 3200,
    cogs: 1280,
    notes: 'Best day yet - great weather',
  },
];

// Sample overheads
export const sampleOverheads: Overhead[] = [
  {
    id: 'o1',
    category: 'Marketing',
    description: 'Social media ads & flyers',
    amount: 500,
    period: 'monthly',
  },
  {
    id: 'o2',
    category: 'Transport',
    description: 'Delivery fuel costs',
    amount: 350,
    period: 'monthly',
  },
  {
    id: 'o3',
    category: 'Equipment',
    description: 'Freezer, blender depreciation',
    amount: 200,
    period: 'monthly',
  },
  {
    id: 'o4',
    category: 'Stall Fees',
    description: 'Market rental fees',
    amount: 600,
    period: 'monthly',
  },
  {
    id: 'o5',
    category: 'Insurance',
    description: 'Business liability insurance',
    amount: 250,
    period: 'monthly',
  },
];

// Local storage keys
const STORAGE_KEYS = {
  RECIPES: 'sweetn4_recipes',
  EVENTS: 'sweetn4_events',
  OVERHEADS: 'sweetn4_overheads',
};

// Storage utilities
export const storage = {
  // Recipes
  loadRecipes(): Recipe[] {
    const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
    return stored ? JSON.parse(stored) : sampleRecipes;
  },
  
  saveRecipes(recipes: Recipe[]): void {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  },
  
  addRecipe(recipe: Recipe): void {
    const recipes = this.loadRecipes();
    recipes.push(recipe);
    this.saveRecipes(recipes);
  },
  
  updateRecipe(updatedRecipe: Recipe): void {
    const recipes = this.loadRecipes();
    const index = recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      this.saveRecipes(recipes);
    }
  },
  
  deleteRecipe(id: string): void {
    const recipes = this.loadRecipes();
    const filtered = recipes.filter(r => r.id !== id);
    this.saveRecipes(filtered);
  },
  
  // Events
  loadEvents(): Event[] {
    const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return stored ? JSON.parse(stored) : sampleEvents;
  },
  
  saveEvents(events: Event[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },
  
  addEvent(event: Event): void {
    const events = this.loadEvents();
    events.push(event);
    this.saveEvents(events);
  },
  
  updateEvent(updatedEvent: Event): void {
    const events = this.loadEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      events[index] = updatedEvent;
      this.saveEvents(events);
    }
  },
  
  deleteEvent(id: string): void {
    const events = this.loadEvents();
    const filtered = events.filter(e => e.id !== id);
    this.saveEvents(filtered);
  },
  
  // Overheads
  loadOverheads(): Overhead[] {
    const stored = localStorage.getItem(STORAGE_KEYS.OVERHEADS);
    return stored ? JSON.parse(stored) : sampleOverheads;
  },
  
  saveOverheads(overheads: Overhead[]): void {
    localStorage.setItem(STORAGE_KEYS.OVERHEADS, JSON.stringify(overheads));
  },
  
  addOverhead(overhead: Overhead): void {
    const overheads = this.loadOverheads();
    overheads.push(overhead);
    this.saveOverheads(overheads);
  },
  
  updateOverhead(updatedOverhead: Overhead): void {
    const overheads = this.loadOverheads();
    const index = overheads.findIndex(o => o.id === updatedOverhead.id);
    if (index !== -1) {
      overheads[index] = updatedOverhead;
      this.saveOverheads(overheads);
    }
  },
  
  deleteOverhead(id: string): void {
    const overheads = this.loadOverheads();
    const filtered = overheads.filter(o => o.id !== id);
    this.saveOverheads(filtered);
  },
  
  // Reset all data
  resetAll(): void {
    this.saveRecipes(sampleRecipes);
    this.saveEvents(sampleEvents);
    this.saveOverheads(sampleOverheads);
  },
};
