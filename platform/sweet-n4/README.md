# Sweet N 4 - Recipe Profit Calculator

**Commercial Application for Recipe Cost Calculation, Profit Margin Analysis, and Menu Pricing Optimization**

Version 1.0 | Copyright © 2026 Sweet N 4

---

## 🎯 Overview

Sweet N 4 is a financial clarity system built specifically for dessert businesses. It helps you track ingredient costs, calculate profit margins, monitor event profitability, and optimize menu pricing for maximum profit.

Based on proven pricing strategies and adapted for real-world recipes like:
- **Juice Blends** (soaks)
- **Bolis** (frozen pops)
- **Fried Elephant Ears**

### Key Features

✅ **Recipe Profit Calculator** - Calculate exact costs and margins per recipe batch
✅ **Event Profit Tracker** - Monitor profitability by event or market day
✅ **Pricing Optimizer** - Get AI-powered pricing recommendations
✅ **Business Dashboard** - Real-time overview of your profitability
✅ **Ingredient Management** - Track all costs down to the gram
✅ **Overhead Tracking** - Factor in marketing, transport, and other indirect costs

---

## 🚀 Quick Start

### Installation

```bash
cd platform/sweet-n4
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 📖 How to Use

### 1. Recipe Profit Calculator

**Purpose:** Calculate the true cost and profitability of each recipe.

**Steps:**
1. Navigate to **Recipe Calculator**
2. Click **New Recipe** or select an existing one
3. Enter:
   - Recipe name and category
   - Batch size (units produced)
   - Selling price per unit
   - All ingredients with costs
   - Packaging cost
   - Labour hours and rate
4. Click **Save Recipe**
5. View instant calculations:
   - Total COGS (Cost of Goods Sold)
   - Cost per unit
   - Gross profit and margin %

**Example:**
```
Recipe: Pineapple Ginger Juice Blend
Batch Size: 4 servings (250ml each)
Ingredients:
  - Pineapple (0.5kg @ R20/1.5kg) = R6.67
  - Ginger (0.25 units @ R15/200g) = R3.75
  - Sugar (0.1kg @ R25/2kg) = R1.25
  - Salt (0.004kg @ R10/1kg) = R0.04
Packaging: R5.00
Labour: 0.5 hours @ R50/hr = R25.00
Total COGS: R41.71
Selling Price: R25/unit × 4 = R100
Gross Profit: R58.29
Margin: 58.3%
```

### 2. Event Profit Tracker

**Purpose:** Track revenue and costs for each market day, event, or catering order.

**Steps:**
1. Navigate to **Event Tracker**
2. Click **New Event**
3. Enter:
   - Event name
   - Date
   - Total revenue
   - Total COGS
   - Optional notes
4. Switch to **Overheads** tab
5. Add monthly costs (marketing, transport, equipment, etc.)
6. View **True Net Profit** after all overheads

**Business Summary Shows:**
- Total revenue across all events
- Gross profit and margin
- True net profit (after overheads)
- Net margin %

### 3. Pricing Optimizer

**Purpose:** Get data-driven recommendations to optimize your menu prices.

**Steps:**
1. Navigate to **Pricing Optimizer**
2. Set your **Target Margin** (recommended: 60% for events, 50% for retail)
3. Review:
   - **Recipes Needing Optimization:** Below target margin
   - **Well-Performing Recipes:** Meeting or exceeding target
   - **Profitability Ranking:** All recipes ranked by margin
4. Implement suggested price increases
5. Re-test and adjust

**Pricing Strategy Tips:**
- Test price increases on highest-margin items first
- Use combo deals to increase average order value
- Adjust seasonally based on ingredient costs
- Maintain 60%+ margin on catering even with volume discounts

---

## 📊 Understanding Your Numbers

### Key Metrics Explained

**COGS (Cost of Goods Sold)**
- Direct costs: ingredients + packaging + labour
- Does NOT include overheads like marketing or rent

**Gross Profit**
- Revenue - COGS
- Shows profit before indirect costs

**Gross Margin %**
- (Gross Profit ÷ Revenue) × 100
- Target: 50-60% for retail, 60-70% for events

**Net Profit**
- Gross Profit - Overheads
- Your true take-home profit

**Net Margin %**
- (Net Profit ÷ Revenue) × 100
- Target: 40%+ after all costs

### When to Worry

❌ **Gross margin < 50%** → Raise prices or reduce ingredient costs
❌ **Net margin < 40%** → Review overheads or increase volume
❌ **Negative profit on events** → Check if you forgot transport/fees
❌ **Wildly varying costs** → Use scales and measuring cups consistently

---

## 💾 Data Storage

All data is stored locally in your browser's `localStorage`. This means:

✅ **Privacy:** Your data never leaves your device
✅ **Speed:** Instant load times
✅ **Offline:** Works without internet

⚠️ **Backup Tip:** Export data regularly or use browser sync

---

## 🎨 Customization

### Change Brand Colors

Edit `/src/index.css`:

```css
:root {
  --color-primary: #E91E63; /* Your brand color */
  --color-secondary: #FF9800;
  --color-accent: #9C27B0;
}
```

### Add New Recipe Categories

Edit `/src/types/index.ts`:

```typescript
export interface Recipe {
  // ...
  category: 'juice-blend' | 'boli' | 'elephant-ear' | 'your-new-category';
}
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Docker

```bash
docker build -t sweet-n4 .
docker run -p 80:80 sweet-n4
```

See `DEPLOYMENT.md` for detailed instructions.

---

## 📱 Mobile Support

The app is fully responsive and works on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iOS, Android)

---

## 🛠 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

---

## 📝 License

Copyright © 2026 Sweet N 4. All rights reserved.

This is a commercial application. Unauthorized copying, modification, or distribution is prohibited.

---

## 🤝 Support

For support, feature requests, or bug reports, please contact:
- **Email:** support@sweetn4.com
- **Website:** https://sweetn4.com

---

## 📚 Based on Sweet N 4 Operations Manual

This app implements the workflows and calculations from the **Sweet N 4 Operations Manual Version 1.0**, including:

- Batch costing methodology
- Ingredient cost calculations  
- Labour and packaging tracking
- Event profitability analysis
- Pricing optimization strategies
- Overhead allocation

For detailed operational procedures, refer to the original manual.

---

**Built with ❤️ for dessert entrepreneurs**
