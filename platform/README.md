# Rehab360 Platform

BetterHelp-style therapy platform aligned to the Universal Treatment Curriculum (UTC) for substance use disorder (SUD) treatment. Built with React, TypeScript, and TanStack Router.

## Features

- 🎨 **Professional Design System** - Teal/amber brand palette with modern UI
- 🏠 **Landing Page** - Therapy category cards and service overview
- 📋 **Smart Matching** - Multi-step questionnaire for therapist-member matching
- 📊 **Member Dashboard** - UTC module progress tracking and session management
- 👥 **Therapist Directory** - Searchable directory with filters and profiles
- 💬 **Secure Messaging** - Real-time encrypted chat (POPIA compliant)
- 🎥 **Video Sessions** - Integrated video therapy (coming soon)

## Tech Stack

- **React 19** - UI framework
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **Lucide React** - Icon library
- **ESLint** - Code linting

## Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Development

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
platform/
├── src/
│   ├── routes/           # TanStack Router route files
│   │   ├── __root.tsx    # Root layout (header, footer)
│   │   ├── index.tsx     # Landing page
│   │   ├── questionnaire.tsx  # Matching questionnaire
│   │   ├── therapists.tsx     # Therapist directory
│   │   ├── dashboard.tsx      # Member dashboard
│   │   └── chat.tsx           # Messaging interface
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles
│   └── routeTree.gen.ts  # Generated route tree (auto)
├── public/               # Static assets
├── dist/                 # Production build (generated)
└── vite.config.ts        # Vite configuration
```

## Routing

The platform uses **TanStack Router** for type-safe, file-based routing:

- `/` - Landing page
- `/questionnaire` - Member onboarding questionnaire
- `/therapists` - Therapist directory
- `/dashboard` - Member dashboard (authenticated)
- `/chat` - Secure messaging

All routes support the TanStack Router pattern of exporting both `Route` configuration and component.

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed deployment instructions.

### Quick Deploy

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
- Push to `main` branch
- GitHub Actions will automatically deploy

Configuration files included:
- `vercel.json` - Vercel configuration
- `netlify.toml` - Netlify configuration
- `.github/workflows/deploy-platform.yml` - GitHub Pages workflow

## Code Style

- **ESLint** enforces code quality rules
- **TypeScript strict mode** ensures type safety
- **React Fast Refresh** warnings for route files are expected (TanStack Router pattern)

## Compliance & Standards

- **POPIA Compliance** - End-to-end encryption for messaging
- **SAQA/HWSETA Aligned** - UTC NQF Level 4 & 5 framework
- **Accessibility** - Semantic HTML and ARIA labels

## Development Notes

### TanStack Router Pattern

Route files export both the route configuration and component:

```tsx
export const Route = createFileRoute('/path')({
  component: MyComponent,
})

function MyComponent() {
  // Component implementation
}
```

This triggers ESLint warnings but is the correct pattern - warnings are downgraded in `eslint.config.js`.

### Environment Variables

Add environment variables to `.env.local` (not committed):

```env
VITE_API_URL=https://api.rehab360.com
VITE_WS_URL=wss://ws.rehab360.com
```

Access via `import.meta.env.VITE_API_URL`.

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Run linter: `npm run lint`
4. Build: `npm run build`
5. Commit and push
6. Open a pull request

## License

See [LICENSE](../LICENSE) in the root directory.

## Support

For issues, questions, or feature requests, open an issue in the main repository: [rehab360-compliance/Rehab360-compliance](https://github.com/rehab360-compliance/Rehab360-compliance)

