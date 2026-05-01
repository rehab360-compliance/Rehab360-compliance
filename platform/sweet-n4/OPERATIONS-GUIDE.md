# Sweet N 4 Operations Manual - Digital Implementation Guide

## Quick Reference: Translating Manual to App

This guide shows how to use the Sweet N 4 web app to implement the workflows from the **Sweet N 4 Operations Manual Version 1.0**.

---

## Section 3: Recipe Profit Calculator

### Manual Reference: Page 3
**"This calculator works for any of the 6 signature recipes"**

### App Implementation:

1. **Open Recipe Calculator** (navigation menu)

2. **Create/Select Recipe:**
   - Click "New Recipe" or select from sidebar
   - Enter recipe name (e.g., "Pineapple Ginger Juice Blend")
   - Select category (Juice Blend, Boli, or Elephant Ear)

3. **Enter Batch Size** (Manual Step 1):
   - "Number of units your recipe produces"
   - Example: 12 bolis, 6 elephant ears, 4 juice blends

4. **Enter Ingredient Costs** (Manual Step 2):
   - Click "Add Ingredient"
   - Name: Pineapple
   - Cost: 20 (what you paid)
   - Unit: "1.5kg" (package size)
   - Qty Used: 0.5 (how much used in batch)
   - **App calculates:** (0.5 / 1.5) × 20 = R6.67

5. **Enter Packaging Costs** (Manual Step 3):
   - Bags, boxes, labels, cups, straws
   - Enter total per batch

6. **Enter Labour Cost** (Manual Step 4):
   - Labour Hours: 0.5
   - Labour Rate: R50/hour
   - **App calculates:** 0.5 × 50 = R25

7. **Automatic Outputs** (Manual Step 5):
   - ✅ Total COGS
   - ✅ Cost per unit
   - ✅ Gross profit per batch
   - ✅ Net profit margin %

8. **Compare Flavours** (Manual Step 6):
   - All recipes shown in sidebar
   - Dashboard shows comparison table
   - Highest margin highlighted

---

## Section 4: Event Profit Tracker

### Manual Reference: Page 4
**"This dashboard helps you track profitability per market, private party, or catering order"**

### App Implementation:

1. **Open Event Tracker** (navigation menu)

2. **Add Event** (Manual Step 1):
   - Click "New Event"
   - Event Name: "Saturday Market - Green Point"
   - Date: Select from calendar
   - Total Revenue: R2,450
   - Total COGS: R980 (from recipe calculations)
   - Notes: "High foot traffic, sold out by 2pm"

3. **Auto-Calculated Figures** (Manual Step 2):
   - ✅ Gross Profit: R1,470
   - ✅ Margin %: 60%
   - Shown instantly in table

4. **Add Monthly Overheads** (Manual Step 3):
   - Switch to "Overheads" tab
   - Click "New Overhead"
   - Category: Marketing
   - Description: Social media ads & flyers
   - Amount: R500
   - Period: Monthly
   - Repeat for all overheads (transport, equipment, stall fees, insurance)

5. **Review True Net Profit** (Manual Step 4):
   - Business Summary card shows:
     - ✅ Total Revenue
     - ✅ Gross Profit
     - ✅ Total Overheads
     - ✅ True Net Profit
     - ✅ True Net Margin %

---

## Section 5: Ingredient Sourcing & Costing Tips

### Manual Tips → App Features:

**"Track seasonal price changes"**
→ Update ingredient costs in Recipe Calculator regularly

**"Use the salt shortcut (1g per 250ml)"**
→ Add salt as ingredient: Cost R10/1kg, Qty 0.004kg

**"Batch multiple recipes together"**
→ Adjust labour hours when batching

---

## Section 6: Pricing Strategy & Optimisation

### Manual Reference: Page 5
**"Know your break-even point, Aim for 50-60% margin"**

### App Implementation:

1. **Open Pricing Optimizer** (navigation menu)

2. **Set Target Margin:**
   - Retail: 50-60%
   - Events: 60-70%
   - Adjust slider to target

3. **Review Recommendations:**
   - **Red cards:** Recipes below target (need price increase)
   - **Green cards:** Recipes meeting target
   - **Suggested prices** shown for each

4. **See Profitability Ranking:**
   - All recipes ranked by margin
   - 🥇🥈🥉 medals for top 3
   - Identify star products

5. **Implement Price Changes:**
   - Go back to Recipe Calculator
   - Edit recipe
   - Update "Selling Price"
   - Save and review new margin

---

## Section 7: Troubleshooting Common Margin Issues

### Manual Problems → App Solutions:

| Manual Problem | Where to Check in App |
|----------------|----------------------|
| "Margin lower than expected" | Recipe Calculator → Breakdown Section |
| "Ingredient costs too high" | Recipe Calculator → Ingredients table |
| "Labour time underestimated" | Recipe Calculator → Edit form |
| "Selling price too low" | Pricing Optimizer → Suggestions |
| "Forgot overheads" | Event Tracker → Overheads tab |
| "Inconsistent portions" | Recipe Calculator → Batch size |

---

## Section 8: Glossary of Terms

All terms from the manual are used in the app:

- **COGS** → Shown in Recipe Calculator breakdown
- **Gross Profit** → Shown in all calculation views
- **Net Profit** → Shown in Business Summary
- **Margin** → Shown as percentage everywhere
- **Overheads** → Event Tracker → Overheads tab
- **Batch Yield** → "Batch Size" in Recipe Calculator

---

## Data Flow: Manual → App

### Weekly Workflow:

**Monday: Plan**
1. Review Dashboard for last week's performance
2. Check Pricing Optimizer for recommendations
3. Update recipe costs if prices changed

**Tuesday-Friday: Track**
1. After each event, add to Event Tracker
2. Record actual revenue and COGS
3. Add notes on what sold well

**Saturday: Events**
1. Use Recipe Calculator to prep batches
2. Calculate quantities needed
3. Track actual sales

**Sunday: Review**
1. Add Saturday's event
2. Review Dashboard metrics
3. Adjust prices if needed
4. Plan next week

---

## Pro Tips

### Accuracy:
- Use **kitchen scale** for ingredients (not cups)
- **Time yourself** for labour hours
- **Keep receipts** for ingredient costs
- **Update prices monthly** when costs change

### Optimization:
- Start with **highest-margin recipes**
- Test **10% price increases** first
- **Batch similar recipes** to save labour
- **Bundle products** for higher order value

### Data Management:
- **Backup data** regularly (browser export)
- **Review weekly** for trends
- **Update immediately** after market changes
- **Archive old events** for comparison

---

## Keyboard Shortcuts

- **Tab** - Move between form fields
- **Enter** - Save form (when focused on button)
- **Esc** - Close modal/cancel edit
- **Ctrl/Cmd + S** - Save (in edit mode)

---

## Mobile Usage

The app works perfectly on mobile:

1. **Dashboard** - Quick overview while at market
2. **Recipe Calculator** - Calculate on-the-go
3. **Event Tracker** - Add events immediately after
4. **Pricing Optimizer** - Review anywhere

**Tip:** Add app to home screen for quick access (iOS/Android)

---

## Getting Help

### In-App:
- Hover over labels for tooltips
- Check Dashboard "Insights" for warnings
- Review Pricing Optimizer "Tips" section

### Documentation:
- README.md - Full feature guide
- DEPLOYMENT.md - Technical setup
- PRODUCTION-CHECKLIST.md - Quality assurance

### Support:
- Check calculations against manual
- Verify sample data matches expectations
- Contact support if calculations seem off

---

## Success Metrics

You're using the app effectively when:

✅ All 6 signature recipes entered
✅ Margins match manual calculations
✅ Events tracked consistently
✅ Dashboard shows improving trends
✅ Pricing optimized quarterly
✅ Net profit above 40%

---

**This app brings the Sweet N 4 Operations Manual to life with real-time calculations and instant insights!** 🎉

For the full manual, refer to the printed **Sweet N 4 Operations Manual Version 1.0**.
