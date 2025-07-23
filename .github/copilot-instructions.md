# Escrow Courier Admin Web Portal

This is a React TypeScript web application for the **Escrow Courier** logistics company admin portal. It provides comprehensive management tools for parcels, delivery agents, and business analytics.

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with lime green primary theme
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Chart.js with react-chartjs-2
- **Package Manager**: npm

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (buttons, inputs, etc.)
│   ├── layout/         # Layout components (header, sidebar, etc.)
│   └── ui/             # Basic UI primitives
├── pages/              # Page components
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard with analytics
│   ├── Parcels.tsx     # Parcel management
│   ├── Agents.tsx      # Agent management
│   └── Reports.tsx     # Business reports
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Color Scheme
- **Primary**: Lime green (#84cc16) - Escrow Courier brand color
- **Secondary**: Gray scale for text and backgrounds
- **Status Colors**: 
  - Pending: Yellow
  - In Transit: Blue
  - Delivered: Green
  - Cancelled: Red

## Key Features to Implement
1. **Authentication System**: Login page with form validation
2. **Dashboard**: Overview with key metrics and charts
3. **Parcel Management**: CRUD operations for parcels with tracking
4. **Agent Management**: Agent profiles, performance metrics, assignments
5. **Reporting**: Analytics and business intelligence dashboards
6. **Responsive Design**: Mobile-first approach with TailwindCSS

## Development Guidelines
- Use TypeScript for type safety
- Follow React best practices with functional components and hooks
- Implement responsive design with TailwindCSS utilities
- Use Lucide React for consistent iconography
- Maintain clean component structure with proper separation of concerns
- Use React Router for navigation between pages
- Implement proper error handling and loading states

## API Integration
- Design for REST API integration
- Use async/await with try-catch for error handling
- Implement loading states for better UX
- Use TypeScript interfaces for API response types

## Styling Conventions
- Use TailwindCSS utility classes
- Leverage custom component classes defined in index.css
- Maintain consistent spacing and typography
- Use the lime green primary color throughout the app
- Implement hover states and smooth transitions

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
