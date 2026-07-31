import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { Env } from '@/env'
import { cors } from 'hono/cors';

/* Routes */
import stats from '@/stats'

const app = new Hono<{Bindings: Env}>()

app.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500
  return c.json({ code: status, error: err.message || 'Internal Server Error' }, status)
})

app.use('*', cors({
  origin: (origin, ctx) => {
    if (origin?.endsWith('localhost:5173') || origin?.endsWith('franciscosolis.workers.dev') || origin?.endsWith('franciscosolis.cl')) {
      return origin
    }
    return 'https://franciscosolis.cl'  // Default allowed origin
  },
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type', 'Authorization'],  // Only include necessary headers
  exposeHeaders: ['Content-Type'],
  maxAge: 600,
  credentials: false,  // Set to true only if needed
}))

app.get('/', (c) => c.json({
  code: 200,
  data: {
    message: '¡Hello, API!'
  }
}))

app.route('/stats', stats)

export default app
