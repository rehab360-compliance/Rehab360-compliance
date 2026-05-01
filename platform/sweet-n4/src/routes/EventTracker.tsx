import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { calculateBusinessSummary, formatCurrency, formatPercent } from '../utils/calculations';
import type { Event, Overhead } from '../types';
import { Plus, Save, Trash2, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import './EventTracker.css';

type ViewMode = 'events' | 'overheads';

export default function EventTracker() {
  const [events, setEvents] = useState<Event[]>([]);
  const [overheads, setOverheads] = useState<Overhead[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('events');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingOverhead, setEditingOverhead] = useState<Overhead | null>(null);

  useEffect(() => {
    setEvents(storage.loadEvents());
    setOverheads(storage.loadOverheads());
  }, []);

  const businessSummary = calculateBusinessSummary(events, overheads);

  // Event handlers
  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: `e${Date.now()}`,
      name: '',
      date: new Date().toISOString().split('T')[0],
      revenue: 0,
      cogs: 0,
      notes: '',
    };
    setEditingEvent(newEvent);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent({ ...event });
  };

  const handleSaveEvent = () => {
    if (!editingEvent) return;
    
    if (events.find(e => e.id === editingEvent.id)) {
      storage.updateEvent(editingEvent);
    } else {
      storage.addEvent(editingEvent);
    }
    
    setEvents(storage.loadEvents());
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    storage.deleteEvent(id);
    setEvents(storage.loadEvents());
  };

  // Overhead handlers
  const handleCreateOverhead = () => {
    const newOverhead: Overhead = {
      id: `o${Date.now()}`,
      category: '',
      description: '',
      amount: 0,
      period: 'monthly',
    };
    setEditingOverhead(newOverhead);
  };

  const handleEditOverhead = (overhead: Overhead) => {
    setEditingOverhead({ ...overhead });
  };

  const handleSaveOverhead = () => {
    if (!editingOverhead) return;
    
    if (overheads.find(o => o.id === editingOverhead.id)) {
      storage.updateOverhead(editingOverhead);
    } else {
      storage.addOverhead(editingOverhead);
    }
    
    setOverheads(storage.loadOverheads());
    setEditingOverhead(null);
  };

  const handleDeleteOverhead = (id: string) => {
    if (!confirm('Are you sure you want to delete this overhead?')) return;
    storage.deleteOverhead(id);
    setOverheads(storage.loadOverheads());
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Event Profit Tracker</h1>
          <p className="subtitle">Track revenue, costs, and profitability per event or market day</p>
        </div>
        <button className="btn btn-primary" onClick={viewMode === 'events' ? handleCreateEvent : handleCreateOverhead}>
          <Plus size={20} />
          {viewMode === 'events' ? 'New Event' : 'New Overhead'}
        </button>
      </div>

      {/* Business Summary */}
      <div className="summary-section">
        <h2>Business Summary</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <Calendar size={24} />
            <div>
              <div className="summary-label">Total Events</div>
              <div className="summary-value">{events.length}</div>
            </div>
          </div>
          <div className="summary-card">
            <DollarSign size={24} />
            <div>
              <div className="summary-label">Total Revenue</div>
              <div className="summary-value">{formatCurrency(businessSummary.totalRevenue)}</div>
            </div>
          </div>
          <div className="summary-card">
            <TrendingUp size={24} />
            <div>
              <div className="summary-label">Gross Profit</div>
              <div className="summary-value">{formatCurrency(businessSummary.totalGrossProfit)}</div>
              <div className="summary-sublabel">
                {formatPercent((businessSummary.totalGrossProfit / businessSummary.totalRevenue) * 100)} margin
              </div>
            </div>
          </div>
          <div className="summary-card highlight">
            <DollarSign size={24} />
            <div>
              <div className="summary-label">True Net Profit</div>
              <div className="summary-value">{formatCurrency(businessSummary.trueNetProfit)}</div>
              <div className="summary-sublabel">
                {formatPercent(businessSummary.trueNetMarginPercent)} margin (after overheads)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === 'events' ? 'active' : ''}`}
          onClick={() => setViewMode('events')}
        >
          Events ({events.length})
        </button>
        <button
          className={`toggle-btn ${viewMode === 'overheads' ? 'active' : ''}`}
          onClick={() => setViewMode('overheads')}
        >
          Overheads ({overheads.length})
        </button>
      </div>

      {/* Events View */}
      {viewMode === 'events' && (
        <div className="content-section">
          {editingEvent && (
            <div className="edit-modal">
              <div className="modal-content">
                <h3>{events.find(e => e.id === editingEvent.id) ? 'Edit Event' : 'New Event'}</h3>
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    value={editingEvent.name}
                    onChange={e => setEditingEvent({ ...editingEvent, name: e.target.value })}
                    placeholder="e.g., Saturday Market - Green Point"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Total Revenue (R)</label>
                    <input
                      type="number"
                      value={editingEvent.revenue}
                      onChange={e => setEditingEvent({ ...editingEvent, revenue: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Total COGS (R)</label>
                    <input
                      type="number"
                      value={editingEvent.cogs}
                      onChange={e => setEditingEvent({ ...editingEvent, cogs: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    value={editingEvent.notes || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, notes: e.target.value })}
                    rows={3}
                    placeholder="e.g., High foot traffic, sold out by 2pm"
                  />
                </div>
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={handleSaveEvent}>
                    <Save size={20} />
                    Save Event
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingEvent(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Revenue</th>
                  <th>COGS</th>
                  <th>Gross Profit</th>
                  <th>Margin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {businessSummary.events.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                      No events yet. Click "New Event" to add your first event.
                    </td>
                  </tr>
                ) : (
                  businessSummary.events.map((eventCalc) => (
                    <tr key={eventCalc.event.id}>
                      <td>
                        <strong>{eventCalc.event.name}</strong>
                        {eventCalc.event.notes && (
                          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                            {eventCalc.event.notes}
                          </div>
                        )}
                      </td>
                      <td>{new Date(eventCalc.event.date).toLocaleDateString()}</td>
                      <td>{formatCurrency(eventCalc.event.revenue)}</td>
                      <td>{formatCurrency(eventCalc.event.cogs)}</td>
                      <td><strong>{formatCurrency(eventCalc.grossProfit)}</strong></td>
                      <td>
                        <strong>{formatPercent(eventCalc.grossMarginPercent)}</strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEditEvent(eventCalc.event)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteEvent(eventCalc.event.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Overheads View */}
      {viewMode === 'overheads' && (
        <div className="content-section">
          {editingOverhead && (
            <div className="edit-modal">
              <div className="modal-content">
                <h3>{overheads.find(o => o.id === editingOverhead.id) ? 'Edit Overhead' : 'New Overhead'}</h3>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={editingOverhead.category}
                    onChange={e => setEditingOverhead({ ...editingOverhead, category: e.target.value })}
                    placeholder="e.g., Marketing, Transport"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={editingOverhead.description}
                    onChange={e => setEditingOverhead({ ...editingOverhead, description: e.target.value })}
                    placeholder="e.g., Social media ads & flyers"
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Amount (R)</label>
                    <input
                      type="number"
                      value={editingOverhead.amount}
                      onChange={e => setEditingOverhead({ ...editingOverhead, amount: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Period</label>
                    <select
                      value={editingOverhead.period}
                      onChange={e => setEditingOverhead({ ...editingOverhead, period: e.target.value as Overhead['period'] })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="per-event">Per Event</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={handleSaveOverhead}>
                    <Save size={20} />
                    Save Overhead
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingOverhead(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <p><strong>Total Overheads:</strong> {formatCurrency(businessSummary.totalOverheads)}</p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                These are indirect costs that affect your true net profit but aren't tied to a specific event.
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {overheads.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                      No overheads yet. Click "New Overhead" to add your first overhead cost.
                    </td>
                  </tr>
                ) : (
                  overheads.map((overhead) => (
                    <tr key={overhead.id}>
                      <td><strong>{overhead.category}</strong></td>
                      <td>{overhead.description}</td>
                      <td><strong>{formatCurrency(overhead.amount)}</strong></td>
                      <td>
                        <span className="badge badge-success">
                          {overhead.period === 'monthly' ? 'Monthly' : 'Per Event'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEditOverhead(overhead)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteOverhead(overhead.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
