# Claude Code Assistant Guidelines

This document provides guidelines for Claude Code when working on this Hono React monorepo project.

## Project Overview

This is a production-ready full-stack TypeScript monorepo boilerplate featuring:
- **Frontend**: React 19 + Vite + TanStack Router + Tailwind CSS v4 + shadcn/ui
- **Backend**: Hono + Bun + PostgreSQL + Drizzle ORM + Better Auth
- **Monorepo**: Turborepo with Bun workspaces
- **Purpose**: Template for rapidly starting new full-stack projects

## Working with This Codebase

### Understanding the Structure

This is a **monorepo** with two main applications and three shared packages:

**Applications:**
- `apps/web` - React frontend (dev: http://localhost:5173)
- `apps/api` - Hono backend API (dev: http://localhost:8000, prod: http://localhost:8000)

**Shared Packages:**
- `packages/database` - Drizzle ORM schemas (tables, types)
- `packages/shared` - Zod schemas and TypeScript types used by both apps
- `packages/config` - Environment variable validation

**Key insight**: Changes to packages affect all apps. Always consider cross-package impacts.

### Development Workflow

1. **Starting Development:**
   ```bash
   bun run dev  # Starts both frontend and backend concurrently
   ```

2. **Before Making Changes:**
   - Read relevant files to understand current implementation
   - Check related files in shared packages
   - Verify types and schemas in packages/shared

3. **After Making Changes:**
   ```bash
   bun run type-check  # Verify no TypeScript errors
   bun run lint        # Check code quality
   bun run build       # Ensure everything builds
   ```

4. **Database Changes:**
   ```bash
   # After modifying packages/database/schema.ts:
   bun run db:generate  # Generate migration
   bun run db:push      # Apply to dev database
   ```

## Code Modification Guidelines

### TypeScript Best Practices

**DO:**
- Use strict TypeScript - no `any` types
- Leverage type inference when obvious
- Define interfaces for object shapes
- Export types from packages/shared for reuse
- Use const assertions for immutable data

**DON'T:**
- Use `any` (use `unknown` if type is truly unknown)
- Ignore TypeScript errors (fix them properly)
- Duplicate type definitions (use shared package)
- Use `@ts-ignore` or `@ts-expect-error` without explanation

### React Component Patterns

**DO:**
- Use function components exclusively
- Keep components under 200 lines
- Extract complex logic into custom hooks
- Use proper TypeScript types for props
- Implement loading and error states
- Use TanStack Query for server state
- Follow shadcn/ui patterns for UI components

**DON'T:**
- Create class components
- Put business logic in components (extract to hooks/utilities)
- Fetch data directly in components (use TanStack Query)
- Inline complex logic (extract to functions)
- Use useEffect for data fetching (use TanStack Query)

### API Development

**DO:**
- Define routes in `apps/api/routes/`
- Use Zod validation middleware
- Return proper HTTP status codes
- Handle errors with try-catch
- Use Drizzle for database queries
- Validate all inputs

**DON'T:**
- Trust user input without validation
- Return raw error messages to clients
- Write raw SQL queries (use Drizzle)
- Expose sensitive data in responses
- Skip error handling

### Database & Schemas

**DO:**
- Define schemas in `packages/database/schema.ts`
- Use migrations for schema changes in production
- Create indexes for frequently queried fields
- Use transactions for multi-step operations
- Follow snake_case naming for tables/columns

**DON'T:**
- Modify database directly without migrations
- Skip indexes on foreign keys
- Use SELECT * (specify columns)
- Forget to handle null values

### Styling & UI

**DO:**
- Use Tailwind utility classes exclusively
- Follow shadcn/ui component patterns
- Use `cn()` utility for conditional classes
- Maintain consistent spacing (use Tailwind scale)
- Use design tokens from theme

**DON'T:**
- Write custom CSS files
- Use inline styles
- Hardcode colors (use Tailwind theme)
- Override shadcn/ui component styles heavily

## Common Task Patterns

### Adding a New API Endpoint

1. Create route handler in `apps/api/routes/`
2. Define Zod schema in `packages/shared`
3. Add route to main app in `apps/api/app.ts`
4. Update API types if using tRPC/similar
5. Test with curl or HTTP client

Example:
```typescript
// packages/shared/schemas/todo.ts
export const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().default(false),
});

// apps/api/routes/todos/index.ts
import { zValidator } from '@hono/zod-validator';
import { todoSchema } from '@your-org/shared';

export const todoRoutes = new Hono()
  .post('/', zValidator('json', todoSchema), async (c) => {
    const data = c.req.valid('json');
    // Create todo in database
    return c.json({ success: true });
  });
```

### Adding a New React Page

1. Create route file in `apps/web/src/routes/`
2. TanStack Router auto-generates route types
3. Add navigation links if needed
4. Implement data fetching with TanStack Query
5. Handle loading/error states

Example:
```typescript
// apps/web/src/routes/todos.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/todos')({
  component: TodosPage,
});

function TodosPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* Render todos */}</div>;
}
```

### Adding a Database Table

1. Define schema in `packages/database/schema.ts`
2. Export from `packages/database/index.ts`
3. Generate migration: `bun run db:generate`
4. Apply migration: `bun run db:migrate` (prod) or `db:push` (dev)
5. Use in API routes with proper types

Example:
```typescript
// packages/database/schema.ts
export const todo = pgTable('todo', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  userId: text('user_id').notNull().references(() => user.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### Adding a Shared Type

1. Define in `packages/shared/types/` or directly in index.ts
2. Export from `packages/shared/index.ts`
3. Use in both apps: `import type { MyType } from '@your-org/shared'`

## Debugging Tips

### Frontend Issues
- Check browser console for errors
- Verify API calls in Network tab
- Use React DevTools for component state
- Check TanStack Query DevTools for cache

### Backend Issues
- Check terminal output for errors
- Verify database connection
- Test endpoints with curl
- Check environment variables are loaded

### Build Issues
- Clear Turborepo cache: `rm -rf .turbo`
- Clear node_modules: `rm -rf node_modules && bun install`
- Check TypeScript errors: `bun run type-check`
- Verify all dependencies installed

## When Modifying Code

### Always Consider:
1. **Type Safety**: Will this break type checking elsewhere?
2. **Shared Packages**: Does this affect other apps?
3. **Breaking Changes**: Will existing code still work?
4. **Database**: Do schema changes need migrations?
5. **Environment**: Are new env vars documented?

### Before Committing:
1. Run `bun run type-check` - No TypeScript errors
2. Run `bun run lint` - Code passes linting
3. Run `bun run build` - Everything builds successfully
4. Test the changes manually
5. Update documentation if needed

## Project-Specific Notes

### Tailwind CSS v4
This project uses the NEW Tailwind CSS v4 with `@tailwindcss/vite` plugin. This means:
- No postcss.config.js needed
- Different syntax in some cases
- Import in CSS: `@import "tailwindcss";`

### Better Auth
Two versions in use:
- Backend (apps/api): v1.4.10
- Frontend (apps/web): v1.4.10

### shadcn/ui
Components are **copied** into the project, not imported from a package. This means:
- Components in `apps/web/src/components/ui/`
- Can be modified freely
- Updates require manual re-copying

### Drizzle ORM
- Development: Use `db:push` to sync schema quickly
- Production: Use migrations with `db:generate` and `db:migrate`
- Never modify database directly in production

## Security Reminders

- **Never commit secrets**: Use environment variables
- **Validate all inputs**: Use Zod schemas
- **Sanitize outputs**: Prevent XSS
- **Use parameterized queries**: Drizzle does this automatically
- **Implement rate limiting**: For public endpoints
- **Use HTTPS**: In production
- **Verify auth**: Check user session before sensitive operations

## Performance Considerations

- **Frontend**: Lazy load routes, optimize images, minimize bundle
- **Backend**: Use connection pooling, optimize queries, cache when appropriate
- **Database**: Add indexes, avoid N+1 queries, use transactions properly
- **Build**: Leverage Turborepo caching, parallelize tasks

## Questions to Ask Yourself

Before implementing:
- Is this the right place for this code?
- Should this be in a shared package?
- Do I need to update types?
- Will this scale?
- Is there a better pattern to use?

After implementing:
- Did I handle errors?
- Did I add proper types?
- Is it tested?
- Is it documented?
- Does it follow project conventions?

## Getting Help

- Check `.aicontext` for technical stack details
- Check `.cursorrules` for code style conventions
- Check `README.md` for setup instructions
- Check `package.json` scripts for available commands
- Read existing code for patterns and examples

## Remember

This is a **boilerplate/template** project. Code quality, consistency, and developer experience are paramount because other developers will use this as a starting point for their projects. Every decision should prioritize:

1. **Developer Experience**: Easy to understand and modify
2. **Type Safety**: Catch errors at compile time
3. **Best Practices**: Follow industry standards
4. **Documentation**: Self-explanatory code with good naming
5. **Consistency**: Follow established patterns

Thank you for helping maintain and improve this project! 🚀
