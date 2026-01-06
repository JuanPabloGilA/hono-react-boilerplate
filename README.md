# Modern Full-Stack Monorepo

A production-ready monorepo template built with Turborepo, featuring a React web application, API server, and shared packages. Perfect for building scalable full-stack applications with modern tooling.

## 🚀 Quick Start

```bash
npx create-hono-react-monorepo
```

Get started in seconds with our interactive CLI tool! It will scaffold the entire monorepo with your custom configuration.

## ✨ Features

- 🚀 **Modern Stack**: React 19, Hono, TypeScript, and Bun
- 🏗️ **Monorepo**: Turborepo for efficient builds and caching
- 🔐 **Authentication**: Better Auth with email/password and OAuth providers
- 🎨 **UI Components**: shadcn/ui with Tailwind CSS and dark mode
- 📱 **Responsive**: Mobile-first design with modern UX patterns
- 🗄️ **Database**: Drizzle ORM with PostgreSQL and migrations
- 🤖 **AI Ready**: Optional OpenAI integration
- 📧 **Email**: Optional Resend integration for transactional emails
- 🔧 **Developer Experience**: Biome linting, pre-commit hooks, and type safety
- 🚀 **Deployment Ready**: Coolify, Docker, and VPS deployment configs

## Structure

```
project/
├── apps/
│   ├── web/                 # React web application
│   └── api/                 # Hono API server
├── packages/
│   ├── database/            # Database schema and migrations
│   ├── shared/              # Shared types and utilities
│   └── config/              # Environment configuration
├── turbo.json               # Turborepo configuration
└── package.json             # Root package.json
```

## Getting Started

### Quick Start with CLI (Recommended)

The fastest way to get started is using our CLI tool:

```bash
npx create-hono-react-monorepo
```

This will:
- Prompt you for a project name and organization name
- Download and configure the template
- Set up your monorepo with custom package names
- Optionally install dependencies

**Alternative package managers:**
```bash
# Using npm
npm create hono-react-monorepo

# Using bun
bunx create-hono-react-monorepo
```

After creation:
```bash
cd your-project-name
cp env.example .env
# Edit .env with your database URL and secrets
bun run dev
```

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- PostgreSQL database

### Manual Installation (Alternative)

If you prefer to clone the repository directly:

```bash
# Clone the repository
git clone https://github.com/JuanPabloGilA/hono-react-boilerplate.git
cd hono-react-boilerplate

# Install dependencies
bun install

# Set up environment variables
cp env.example .env
# Edit .env with your database URL and other secrets
```

### Development

```bash
# Start all apps in development mode
bun run dev

# Start specific app
bun run dev --filter=@your-org/web
bun run dev --filter=@your-org/api

# Build all apps
bun run build

# Run linting
bun run lint

# Type checking
bun run type-check
```

### Database

```bash
# Generate migrations
bun run db:generate

# Push schema changes
bun run db:push

# Run migrations
bun run db:migrate
```

## Apps

### Web App (`apps/web`)
- React 19 with Vite for fast development
- TanStack Router for type-safe routing
- Tailwind CSS for utility-first styling
- Radix UI components for accessibility
- Better Auth for authentication
- shadcn/ui component library
- Dark/light theme support

### API (`apps/api`)
- Hono framework for high-performance APIs
- Better Auth for secure authentication
- Drizzle ORM with PostgreSQL
- AI integration with OpenAI (optional)
- Email functionality with Resend (optional)
- Type-safe API routes

## Packages

### Database (`packages/database`)
- Drizzle schema definitions
- Database migrations
- Connection utilities

### Shared (`packages/shared`)
- TypeScript types
- Zod validation schemas
- Shared utilities

### Config (`packages/config`)
- Environment variable validation
- Configuration utilities

## Scripts

- `bun run dev` - Start all apps in development mode
- `bun run build` - Build all apps for production
- `bun run lint` - Lint all packages with Biome
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format` - Format code with Biome
- `bun run type-check` - Type check all packages
- `bun run clean` - Clean all build artifacts

## Tech Stack

- **Monorepo**: Turborepo for fast, cached builds
- **Runtime**: Bun for lightning-fast package management
- **Frontend**: React 19, Vite, TanStack Router, Tailwind CSS, shadcn/ui
- **Backend**: Hono, Better Auth
- **Database**: PostgreSQL, Drizzle ORM
- **AI**: OpenAI SDK (optional)
- **Email**: Resend (optional)
- **Type Safety**: TypeScript, Zod
- **Linting**: Biome for fast linting and formatting
- **Git Hooks**: Husky for pre-commit formatting

## Customization

### Setting up your project

**If using the CLI (recommended):**
The CLI automatically handles package naming and setup. You only need to:

1. **Environment variables**: Copy `.env.example` to `.env` and configure your settings
2. **Database**: Set up your PostgreSQL database and update the connection string
3. **Authentication**: Configure Better Auth providers in `apps/api/lib/auth.ts`
4. **Optional services**: Set up OpenAI and Resend if you need AI or email functionality

**If manually cloning:**
1. **Update package names**: Change `@your-org` in all `package.json` files to your organization name
2. **Environment variables**: Copy `.env.example` to `.env` and configure your settings
3. **Database**: Set up your PostgreSQL database and update the connection string
4. **Authentication**: Configure Better Auth providers in `apps/api/lib/auth.ts`
5. **Optional services**: Set up OpenAI and Resend if you need AI or email functionality

### Development workflow

1. Make changes in the appropriate app or package
2. Run `bun run type-check` to ensure type safety
3. Run `bun run lint` to check code quality
4. Test your changes with `bun run dev`
5. Code is automatically formatted on commit via pre-commit hooks

## Deployment

This template includes deployment configuration for:
- **Coolify**: Ready-to-deploy with `nixpacks.toml`
- **Docker**: Multi-stage Dockerfile for production builds
- **Self-hosting**: Optimized for VPS deployment

## CLI Tool

This template can be scaffolded using our CLI tool: [create-hono-react-monorepo](https://github.com/JuanPabloGilA/create-hono-react-monorepo)

```bash
npx create-hono-react-monorepo
```

The CLI provides:
- Interactive prompts for project configuration
- Automatic package namespace replacement
- Optional dependency installation
- Beautiful terminal UI with progress indicators

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - feel free to use this template for your projects!