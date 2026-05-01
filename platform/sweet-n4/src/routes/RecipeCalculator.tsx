import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { calculateRecipe, formatCurrency, formatPercent, validateRecipe } from '../utils/calculations';
import type { Recipe, Ingredient } from '../types';
import { Plus, Save, Trash2, Calculator, AlertCircle } from 'lucide-react';
import './RecipeCalculator.css';

export default function RecipeCalculator() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const loadedRecipes = storage.loadRecipes();
    setRecipes(loadedRecipes);
    if (loadedRecipes.length > 0 && !selectedRecipeId) {
      setSelectedRecipeId(loadedRecipes[0].id);
    }
  }, []);

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId);
  const calculation = selectedRecipe ? calculateRecipe(selectedRecipe) : null;

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
    setEditingRecipe(null);
    setErrors([]);
  };

  const handleEditRecipe = () => {
    if (selectedRecipe) {
      setEditingRecipe({ ...selectedRecipe });
      setErrors([]);
    }
  };

  const handleSaveRecipe = () => {
    if (!editingRecipe) return;
    
    const validationErrors = validateRecipe(editingRecipe);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    storage.updateRecipe(editingRecipe);
    setRecipes(storage.loadRecipes());
    setSelectedRecipeId(editingRecipe.id);
    setEditingRecipe(null);
    setErrors([]);
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null);
    setErrors([]);
  };

  const handleAddIngredient = () => {
    if (!editingRecipe) return;
    const newIngredient: Ingredient = {
      id: `i${Date.now()}`,
      name: '',
      cost: 0,
      unit: 'kg',
      quantityUsed: 0,
    };
    setEditingRecipe({
      ...editingRecipe,
      ingredients: [...editingRecipe.ingredients, newIngredient],
    });
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: editingRecipe.ingredients.filter(i => i.id !== ingredientId),
    });
  };

  const handleIngredientChange = (ingredientId: string, field: keyof Ingredient, value: string | number) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: editingRecipe.ingredients.map(i =>
        i.id === ingredientId ? { ...i, [field]: value } : i
      ),
    });
  };

  const handleCreateNew = () => {
    const newRecipe: Recipe = {
      id: `r${Date.now()}`,
      name: 'New Recipe',
      category: 'juice-blend',
      batchSize: 1,
      ingredients: [],
      packagingCost: 0,
      labourHours: 0,
      labourRate: 50,
      sellingPrice: 0,
    };
    setEditingRecipe(newRecipe);
    setErrors([]);
  };

  const handleDeleteRecipe = () => {
    if (!selectedRecipe) return;
    if (!confirm(`Are you sure you want to delete "${selectedRecipe.name}"?`)) return;
    
    storage.deleteRecipe(selectedRecipe.id);
    const updatedRecipes = storage.loadRecipes();
    setRecipes(updatedRecipes);
    setSelectedRecipeId(updatedRecipes.length > 0 ? updatedRecipes[0].id : '');
    setEditingRecipe(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Recipe Profit Calculator</h1>
          <p className="subtitle">Calculate exact costs, margins, and profitability for each recipe</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          <Plus size={20} />
          New Recipe
        </button>
      </div>

      <div className="calculator-layout">
        {/* Recipe Selector Sidebar */}
        <div className="recipe-sidebar">
          <h3>Your Recipes</h3>
          <div className="recipe-list">
            {recipes.map(recipe => (
              <button
                key={recipe.id}
                className={`recipe-item ${selectedRecipeId === recipe.id ? 'active' : ''}`}
                onClick={() => handleSelectRecipe(recipe.id)}
              >
                <div className="recipe-item-name">{recipe.name}</div>
                <div className="recipe-item-category">
                  {recipe.category.replace('-', ' ')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="calculator-content">
          {editingRecipe ? (
            /* Edit Mode */
            <div className="edit-form">
              <h2>{editingRecipe.id.startsWith('r') && recipes.find(r => r.id === editingRecipe.id) ? 'Edit Recipe' : 'New Recipe'}</h2>
              
              {errors.length > 0 && (
                <div className="error-box">
                  <AlertCircle size={20} />
                  <div>
                    <strong>Please fix the following errors:</strong>
                    <ul>
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Recipe Name</label>
                    <input
                      type="text"
                      value={editingRecipe.name}
                      onChange={e => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={editingRecipe.category}
                      onChange={e => setEditingRecipe({ ...editingRecipe, category: e.target.value as Recipe['category'] })}
                    >
                      <option value="juice-blend">Juice Blend</option>
                      <option value="boli">Boli (Frozen Pop)</option>
                      <option value="elephant-ear">Elephant Ear</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Batch Size (units produced)</label>
                    <input
                      type="number"
                      value={editingRecipe.batchSize}
                      onChange={e => setEditingRecipe({ ...editingRecipe, batchSize: Number(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Selling Price (per unit)</label>
                    <input
                      type="number"
                      value={editingRecipe.sellingPrice}
                      onChange={e => setEditingRecipe({ ...editingRecipe, sellingPrice: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-header">
                  <h3>Ingredients</h3>
                  <button className="btn btn-secondary btn-sm" onClick={handleAddIngredient}>
                    <Plus size={16} />
                    Add Ingredient
                  </button>
                </div>
                {editingRecipe.ingredients.map(ingredient => (
                  <div key={ingredient.id} className="ingredient-row">
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={e => handleIngredientChange(ingredient.id, 'name', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Cost"
                      value={ingredient.cost}
                      onChange={e => handleIngredientChange(ingredient.id, 'cost', Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="text"
                      placeholder="Unit (e.g., kg, L)"
                      value={ingredient.unit}
                      onChange={e => handleIngredientChange(ingredient.id, 'unit', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Qty used"
                      value={ingredient.quantityUsed}
                      onChange={e => handleIngredientChange(ingredient.id, 'quantityUsed', Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                      title="Remove ingredient"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3>Costs</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Packaging Cost (per batch)</label>
                    <input
                      type="number"
                      value={editingRecipe.packagingCost}
                      onChange={e => setEditingRecipe({ ...editingRecipe, packagingCost: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Labour Hours (per batch)</label>
                    <input
                      type="number"
                      value={editingRecipe.labourHours}
                      onChange={e => setEditingRecipe({ ...editingRecipe, labourHours: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Labour Rate (ZAR/hour)</label>
                    <input
                      type="number"
                      value={editingRecipe.labourRate}
                      onChange={e => setEditingRecipe({ ...editingRecipe, labourRate: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSaveRecipe}>
                  <Save size={20} />
                  Save Recipe
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : calculation ? (
            /* View Mode */
            <div className="calculation-view">
              <div className="view-header">
                <div>
                  <h2>{selectedRecipe!.name}</h2>
                  <p className="recipe-category">{selectedRecipe!.category.replace('-', ' ')}</p>
                </div>
                <div className="view-actions">
                  <button className="btn btn-secondary" onClick={handleEditRecipe}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDeleteRecipe}>
                    <Trash2 size={20} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Calculation Results */}
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-label">Total COGS</div>
                  <div className="result-value">{formatCurrency(calculation.totalCOGS)}</div>
                  <div className="result-detail">per batch of {selectedRecipe!.batchSize} units</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Cost Per Unit</div>
                  <div className="result-value">{formatCurrency(calculation.costPerUnit)}</div>
                  <div className="result-detail">selling at {formatCurrency(selectedRecipe!.sellingPrice)}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Gross Profit</div>
                  <div className="result-value">{formatCurrency(calculation.grossProfit)}</div>
                  <div className="result-detail">per batch</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Gross Margin</div>
                  <div className="result-value">{formatPercent(calculation.grossMarginPercent)}</div>
                  <div className="result-detail">
                    {calculation.grossMarginPercent >= 60 && <span className="badge badge-success">Excellent</span>}
                    {calculation.grossMarginPercent >= 50 && calculation.grossMarginPercent < 60 && (
                      <span className="badge badge-warning">Good</span>
                    )}
                    {calculation.grossMarginPercent < 50 && <span className="badge badge-danger">Improve</span>}
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="breakdown-section">
                <h3>Cost Breakdown</h3>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <div className="breakdown-label">Ingredients</div>
                    <div className="breakdown-value">{formatCurrency(calculation.totalIngredientCost)}</div>
                    <div className="breakdown-percent">
                      {formatPercent((calculation.totalIngredientCost / calculation.totalCOGS) * 100)}
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Packaging</div>
                    <div className="breakdown-value">{formatCurrency(calculation.totalPackagingCost)}</div>
                    <div className="breakdown-percent">
                      {formatPercent((calculation.totalPackagingCost / calculation.totalCOGS) * 100)}
                    </div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Labour</div>
                    <div className="breakdown-value">{formatCurrency(calculation.totalLabourCost)}</div>
                    <div className="breakdown-percent">
                      {formatPercent((calculation.totalLabourCost / calculation.totalCOGS) * 100)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="ingredients-section">
                <h3>Ingredients</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Cost</th>
                      <th>Unit</th>
                      <th>Qty Used</th>
                      <th>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRecipe!.ingredients.map(ingredient => (
                      <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{formatCurrency(ingredient.cost)}</td>
                        <td>{ingredient.unit}</td>
                        <td>{ingredient.quantityUsed}</td>
                        <td><strong>{formatCurrency(ingredient.cost * ingredient.quantityUsed)}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Calculator size={48} />
              <h2>No Recipe Selected</h2>
              <p>Select a recipe from the sidebar or create a new one</p>
              <button className="btn btn-primary" onClick={handleCreateNew}>
                <Plus size={20} />
                Create New Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
