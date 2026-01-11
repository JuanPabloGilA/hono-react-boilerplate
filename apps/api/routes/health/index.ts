import { Hono } from 'hono';

export const healthRoutes = new Hono().get('/', async (c) => {
  return c.json({ message: 'API is healthy' });
});
