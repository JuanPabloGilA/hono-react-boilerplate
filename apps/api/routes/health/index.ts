import { Hono } from 'hono';
import { user, verification } from '@your-org/database/schema';
import { db } from '../../db';

export const healthRoutes = new Hono().get('/', async (c) => {
  const data = await db.select().from(verification);
  const userData = await db.select().from(user);
  console.log(data);
  console.log(userData);
  return c.json({ message: 'API is healthy' });
});
