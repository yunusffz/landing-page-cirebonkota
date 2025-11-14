# Landing Page Cirebon Kota

A modern landing page built with Next.js for Cirebon Kota's open data portal, featuring data visualizations, infographics, and interactive sections.

## Tech Stack

- **Framework**: Next.js 16.0.1 (React 19.2.0)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI primitives
- **Animations**: Motion (Framer Motion), Lottie React
- **Data Fetching**: TanStack React Query 5.90.7
- **HTTP Client**: Axios
- **Package Manager**: PNPM (recommended)

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js**: Version 18.x or higher
- **PNPM**: Version 8.x or higher (recommended) or npm/yarn

To install PNPM globally:

```bash
npm install -g pnpm
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd landing-page-cirebonkota
```

### 2. Install dependencies

```bash
pnpm install
```

Or if you're using npm:

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=
TURBOPACK=1
NEXT_CACHE=false
NEXT_DISABLE_CACHE=1
```

**Environment Variables Explained:**

- `NEXT_PUBLIC_API_URL`: The base URL for the Open Data API
- `TURBOPACK`: Enable Turbopack for faster development builds
- `NEXT_CACHE`: Disable Next.js caching (development)
- `NEXT_DISABLE_CACHE`: Additional cache disabling flag

### 4. Run the development server

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- **`pnpm dev`** - Start the development server with hot-reload
- **`pnpm build`** - Build the application for production
- **`pnpm start`** - Start the production server (run after `build`)
- **`pnpm lint`** - Run ESLint to check for code quality issues
- **`pnpm prepare`** - Set up Husky git hooks (runs automatically after install)

## Project Structure

```
landing-page-cirebonkota/
├── app/                    # Next.js app directory
├── components/             # React components
│   └── sections/          # Page section components
├── queries/               # API query hooks
│   ├── infographic/       # Infographic data queries
│   └── visualization/     # Data visualization queries
├── public/                # Static assets
├── .env                   # Environment variables (not committed)
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Building for Production

1. Create a production build:

```bash
pnpm build
```

2. Start the production server:

```bash
pnpm start
```

The optimized application will be ready for deployment.

## Key Features

- **Open Data Section**: Display and interact with open data from Cirebon Kota
- **Satu Data Section**: Unified data portal interface
- **Satu Peta Section**: Map-based data visualization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Theme switching with next-themes
- **Data Visualization**: Interactive charts and infographics
- **Performance Optimized**: Uses Turbopack and modern React features

## Development Notes

- This project uses **Turbopack** for faster development builds
- Git hooks are configured via **Husky** for code quality enforcement
- The project uses **PNPM overrides** to ensure consistent React types
- Cache is disabled in development for easier debugging

## API Integration

The application fetches data from the Cirebon Kota Open Data API. All API calls are managed through:

- React Query for caching and state management
- Axios for HTTP requests
- Custom query hooks in the `queries/` directory

## Troubleshooting

### Port already in use

If port 3000 is already in use, you can specify a different port:

```bash
pnpm dev -p 3001
```

### Build errors

If you encounter build errors, try:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild
pnpm build
```

### Type errors

Ensure TypeScript dependencies are up to date:

```bash
pnpm add -D typescript@latest @types/node@latest @types/react@latest
```

## Contributing

1. Create a feature branch from `staging`
2. Make your changes
3. Ensure linting passes: `pnpm lint`
4. Commit your changes (Husky will run pre-commit hooks)
5. Push to your branch and create a Pull Request

## Git Workflow

- **Main Branch**: `staging` (current working branch)
- Modified files currently include section components for open data, satu data, and satu peta

## License

[Add your license information here]

## Support

For issues or questions, please contact the development team or create an issue in the repository.
