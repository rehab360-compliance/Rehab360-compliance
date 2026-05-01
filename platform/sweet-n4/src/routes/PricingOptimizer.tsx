import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { suggestPriceOptimization, compareRecipes, formatCurrency, formatPercent } from '../utils/calculations';
import type { Recipe } from '../types';
import { TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import './PricingOptimizer.css';

export default function PricingOptimizer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [targetMargin, setTargetMargin] = useState<number>(60);

  useEffect(() => {
    setRecipes(storage.loadRecipes());
  }, []);

  const comparison = compareRecipes(recipes);
  const optimizations = recipes.map(recipe => suggestPriceOptimization(recipe, targetMargin));

  const needsImprovement = optimizations.filter(opt => opt.currentMargin < targetMargin);
  const performing = optimizations.filter(opt => opt.currentMargin >= targetMargin);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Pricing Optimizer</h1>
          <p className="subtitle">Optimize your menu prices for maximum profitability</p>
        </div>
      </div>

      {/* Target Margin Selector */}
      <div className="target-section card">
        <div className="target-header">
          <div>
            <h3>Target Margin Goal</h3>
            <p>Set your desired profit margin for recipe recommendations</p>
          </div>
          <div className="target-input-group">
            <Target size={24} />
            <input
              type="number"
              value={targetMargin}
              onChange={e => setTargetMargin(Number(e.target.value))}
              min="0"
              max="100"
              step="5"
            />
            <span>%</span>
          </div>
        </div>
        <div className="target-info">
          <div className="info-item">
            <strong>Recommended for retail products:</strong> 50-60% margin
          </div>
          <div className="info-item">
            <strong>Recommended for events/catering:</strong> 60-70% margin
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="optimizer-stats">
        <div className="stat-card stat-success">
          <CheckCircle size={32} />
          <div>
            <div className="stat-value">{performing.length}</div>
            <div className="stat-label">Meeting Target</div>
          </div>
        </div>
        <div className="stat-card stat-warning">
          <AlertTriangle size={32} />
          <div>
            <div className="stat-value">{needsImprovement.length}</div>
            <div className="stat-label">Need Improvement</div>
          </div>
        </div>
        <div className="stat-card stat-info">
          <TrendingUp size={32} />
          <div>
            <div className="stat-value">{recipes.length}</div>
            <div className="stat-label">Total Recipes</div>
          </div>
        </div>
      </div>

      {/* Recipes Needing Improvement */}
      {needsImprovement.length > 0 && (
        <div className="section">
          <div className="section-header alert">
            <AlertTriangle size={24} />
            <div>
              <h2>Recipes Needing Price Optimization</h2>
              <p>These recipes are below your target margin of {targetMargin}%</p>
            </div>
          </div>

          <div className="optimization-grid">
            {needsImprovement.map(opt => {
              const recipe = recipes.find(r => r.id === opt.recipeId)!;
              const improvement = opt.suggestedPrice - opt.currentPrice;
              
              return (
                <div key={opt.recipeId} className="optimization-card">
                  <div className="card-header">
                    <div>
                      <h3>{opt.recipeName}</h3>
                      <p className="recipe-category">{recipe.category.replace('-', ' ')}</p>
                    </div>
                    <div className="margin-badge margin-low">
                      {formatPercent(opt.currentMargin)}
                    </div>
                  </div>

                  <div className="price-comparison">
                    <div className="price-item">
                      <div className="price-label">Current Price</div>
                      <div className="price-value current">{formatCurrency(opt.currentPrice)}</div>
                      <div className="price-margin">
                        Margin: {formatPercent(opt.currentMargin)}
                      </div>
                    </div>
                    
                    <div className="price-arrow">→</div>
                    
                    <div className="price-item">
                      <div className="price-label">Suggested Price</div>
                      <div className="price-value suggested">{formatCurrency(opt.suggestedPrice)}</div>
                      <div className="price-margin">
                        Margin: {formatPercent(opt.suggestedMargin)}
                      </div>
                    </div>
                  </div>

                  <div className="improvement-info">
                    <div className="improvement-detail">
                      <span>Price Increase:</span>
                      <strong>{formatCurrency(improvement)} ({formatPercent(opt.priceIncreasePercent)})</strong>
                    </div>
                  </div>

                  <div className="recommendation">
                    <strong>Recommendation:</strong>
                    <p>{opt.reasoning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Well-Performing Recipes */}
      {performing.length > 0 && (
        <div className="section">
          <div className="section-header success">
            <CheckCircle size={24} />
            <div>
              <h2>Well-Performing Recipes</h2>
              <p>These recipes meet or exceed your target margin of {targetMargin}%</p>
            </div>
          </div>

          <div className="performance-grid">
            {performing.map(opt => {
              const recipe = recipes.find(r => r.id === opt.recipeId)!;
              
              return (
                <div key={opt.recipeId} className="performance-card">
                  <div className="card-header">
                    <div>
                      <h4>{opt.recipeName}</h4>
                      <p className="recipe-category">{recipe.category.replace('-', ' ')}</p>
                    </div>
                    <div className="margin-badge margin-good">
                      {formatPercent(opt.currentMargin)}
                    </div>
                  </div>
                  
                  <div className="performance-details">
                    <div className="detail-item">
                      <span>Price:</span>
                      <strong>{formatCurrency(opt.currentPrice)}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Margin:</span>
                      <strong>{formatPercent(opt.currentMargin)}</strong>
                    </div>
                  </div>

                  <div className="recommendation success">
                    <CheckCircle size={16} />
                    <p>{opt.reasoning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Profitability Ranking */}
      <div className="section">
        <h2>Recipe Profitability Ranking</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
          Your recipes ranked from highest to lowest gross margin
        </p>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Recipe</th>
                <th>Cost/Unit</th>
                <th>Selling Price</th>
                <th>Gross Margin</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((metric, index) => {
                const recipe = recipes.find(r => r.id === metric.recipeId)!;
                const rank = index + 1;
                
                return (
                  <tr key={metric.recipeId}>
                    <td>
                      <div className="rank-badge">
                        {rank === 1 && '🥇'}
                        {rank === 2 && '🥈'}
                        {rank === 3 && '🥉'}
                        {rank > 3 && `#${rank}`}
                      </div>
                    </td>
                    <td>
                      <strong>{metric.recipeName}</strong>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {recipe.category.replace('-', ' ')}
                      </div>
                    </td>
                    <td>{formatCurrency(metric.costPerUnit)}</td>
                    <td>{formatCurrency(metric.sellingPrice)}</td>
                    <td>
                      <strong style={{ fontSize: '1.125rem' }}>{formatPercent(metric.grossMargin)}</strong>
                    </td>
                    <td>
                      {metric.grossMargin >= targetMargin && (
                        <span className="badge badge-success">Excellent</span>
                      )}
                      {metric.grossMargin >= targetMargin - 10 && metric.grossMargin < targetMargin && (
                        <span className="badge badge-warning">Good</span>
                      )}
                      {metric.grossMargin < targetMargin - 10 && (
                        <span className="badge badge-danger">Needs Work</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Strategy Tips */}
      <div className="tips-section card">
        <h3>Pricing Strategy Tips</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Test Price Increases</strong>
            <p>Start with your highest-margin items first. Customers are less price-sensitive to premium products.</p>
          </div>
          <div className="tip-item">
            <strong>Bundle Deals</strong>
            <p>Offer combo packages (e.g., 6 bolis + 3 elephant ears) to increase average order value without lowering per-item margins.</p>
          </div>
          <div className="tip-item">
            <strong>Seasonal Pricing</strong>
            <p>Adjust prices based on ingredient costs. Raise prices in winter when fruit is expensive, lower in summer.</p>
          </div>
          <div className="tip-item">
            <strong>Volume Discounts</strong>
            <p>For catering orders, maintain at least 60% margin even with bulk discounts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
