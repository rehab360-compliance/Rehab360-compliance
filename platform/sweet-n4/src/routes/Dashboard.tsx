import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { calculateRecipe, compareRecipes, calculateBusinessSummary, formatCurrency, formatPercent } from '../utils/calculations';
import type { Recipe, Event, Overhead } from '../types';
import { TrendingUp, DollarSign, Percent, AlertCircle } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [overheads, setOverheads] = useState<Overhead[]>([]);

  useEffect(() => {
    setRecipes(storage.loadRecipes());
    setEvents(storage.loadEvents());
    setOverheads(storage.loadOverheads());
  }, []);

  const recipeComparison = compareRecipes(recipes);
  const businessSummary = calculateBusinessSummary(events, overheads);
  
  const topPerformer = recipeComparison[0];
  const lowestMargin = recipeComparison[recipeComparison.length - 1];

  return (
    <div className="container">
      <h1>Business Dashboard</h1>
      <p className="subtitle">Financial clarity for your Sweet N 4 dessert business</p>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: 'rgba(233, 30, 99, 0.1)' }}>
            <DollarSign size={24} color="var(--color-primary)" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Total Revenue</div>
            <div className="metric-value">{formatCurrency(businessSummary.totalRevenue)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
            <TrendingUp size={24} color="var(--color-success)" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Gross Profit</div>
            <div className="metric-value">{formatCurrency(businessSummary.totalGrossProfit)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)' }}>
            <Percent size={24} color="var(--color-secondary)" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Gross Margin</div>
            <div className="metric-value">
              {formatPercent((businessSummary.totalGrossProfit / businessSummary.totalRevenue) * 100)}
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: 'rgba(156, 39, 176, 0.1)' }}>
            <DollarSign size={24} color="var(--color-accent)" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Net Profit</div>
            <div className="metric-value">{formatCurrency(businessSummary.trueNetProfit)}</div>
            <div className="metric-sublabel">{formatPercent(businessSummary.trueNetMarginPercent)} margin</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h2>Key Insights</h2>
        
        {topPerformer && (
          <div className="insight-card insight-success">
            <TrendingUp size={20} />
            <div>
              <strong>{topPerformer.recipeName}</strong> is your top performer with{' '}
              <strong>{formatPercent(topPerformer.grossMargin)}</strong> gross margin.
            </div>
          </div>
        )}

        {lowestMargin && lowestMargin.grossMargin < 50 && (
          <div className="insight-card insight-warning">
            <AlertCircle size={20} />
            <div>
              <strong>{lowestMargin.recipeName}</strong> has a low margin of{' '}
              <strong>{formatPercent(lowestMargin.grossMargin)}</strong>. Consider raising the price or reducing costs.
            </div>
          </div>
        )}

        {businessSummary.trueNetMarginPercent < 40 && (
          <div className="insight-card insight-danger">
            <AlertCircle size={20} />
            <div>
              Your net margin ({formatPercent(businessSummary.trueNetMarginPercent)}) is below the recommended 40%.
              Review your overheads ({formatCurrency(businessSummary.totalOverheads)}) or increase prices.
            </div>
          </div>
        )}
      </div>

      {/* Recipe Performance Table */}
      <div className="card">
        <h2>Recipe Performance Comparison</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Cost/Unit</th>
                <th>Selling Price</th>
                <th>Gross Margin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recipeComparison.map((metric) => {
                const recipe = recipes.find(r => r.id === metric.recipeId);
                return (
                  <tr key={metric.recipeId}>
                    <td>
                      <strong>{metric.recipeName}</strong>
                      <br />
                      <small style={{ color: 'var(--color-text-secondary)' }}>
                        {recipe?.category.replace('-', ' ')}
                      </small>
                    </td>
                    <td>{formatCurrency(metric.costPerUnit)}</td>
                    <td>{formatCurrency(metric.sellingPrice)}</td>
                    <td>
                      <strong>{formatPercent(metric.grossMargin)}</strong>
                    </td>
                    <td>
                      {metric.grossMargin >= 60 && <span className="badge badge-success">Excellent</span>}
                      {metric.grossMargin >= 50 && metric.grossMargin < 60 && (
                        <span className="badge badge-warning">Good</span>
                      )}
                      {metric.grossMargin < 50 && <span className="badge badge-danger">Improve</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Events */}
      <div className="card">
        <h2>Recent Events</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Revenue</th>
                <th>Gross Profit</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {businessSummary.events.slice(0, 5).map((eventCalc) => (
                <tr key={eventCalc.event.id}>
                  <td><strong>{eventCalc.event.name}</strong></td>
                  <td>{new Date(eventCalc.event.date).toLocaleDateString()}</td>
                  <td>{formatCurrency(eventCalc.event.revenue)}</td>
                  <td>{formatCurrency(eventCalc.grossProfit)}</td>
                  <td>
                    <strong>{formatPercent(eventCalc.grossMarginPercent)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
