import { useState } from 'react';
import './App.css';
import Dashboard from './routes/Dashboard';
import RecipeCalculator from './routes/RecipeCalculator';
import EventTracker from './routes/EventTracker';
import PricingOptimizer from './routes/PricingOptimizer';
import { Calculator, TrendingUp, Calendar, DollarSign } from 'lucide-react';

type Page = 'dashboard' | 'calculator' | 'events' | 'pricing';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calculator':
        return <RecipeCalculator />;
      case 'events':
        return <EventTracker />;
      case 'pricing':
        return <PricingOptimizer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Calculator size={32} />
            <span>Sweet N 4</span>
          </div>
          <nav className="nav">
            <a
              href="#"
              className={currentPage === 'dashboard' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('dashboard');
              }}
            >
              <TrendingUp size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Dashboard
            </a>
            <a
              href="#"
              className={currentPage === 'calculator' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('calculator');
              }}
            >
              <Calculator size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Recipe Calculator
            </a>
            <a
              href="#"
              className={currentPage === 'events' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('events');
              }}
            >
              <Calendar size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Event Tracker
            </a>
            <a
              href="#"
              className={currentPage === 'pricing' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('pricing');
              }}
            >
              <DollarSign size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Pricing Optimizer
            </a>
          </nav>
        </div>
      </header>

      <main className="main">
        {renderPage()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Sweet N 4 - Recipe Profit Calculator | Version 1.0</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
