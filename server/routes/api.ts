/**
 * API Routes
 * 
 * Main API router that handles all /api/* endpoints.
 * Add your custom API routes here.
 */

import { Router, Request, Response } from 'express';
import { authRouter } from './auth';

export const router = Router();

// Mount auth routes
router.use('/auth', authRouter);

/**
 * GET /api/info
 * Returns basic information about the API.
 */
router.get('/info', (_req: Request, res: Response) => {
  res.json({
    name: 'Hootsuite Embedded App API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      info: 'GET /api/info',
      authStatus: 'GET /api/auth/status',
      // Add more endpoints as you build them
    },
  });
});

/**
 * GET /api/context
 * Returns the current app context.
 * 
 * STUB: In production, this would validate the JWT and return
 * actual user/organization data from Hootsuite.
 */
router.get('/context', (req: Request, res: Response) => {
  // TODO: Implement JWT validation middleware
  // TODO: Fetch actual context from Hootsuite API

  res.json({
    user: {
      id: 'mock-user-123',
      displayName: 'Test Developer',
      email: 'developer@example.com',
    },
    organization: {
      id: 'mock-org-456',
      name: 'Development Organization',
    },
    appId: process.env.HOOTSUITE_APP_ID || 'mock-app-id',
  });
});

/**
 * Example protected endpoint template.
 * Demonstrates how to structure API endpoints.
 */
router.get('/example', (_req: Request, res: Response) => {
  res.json({
    message: 'This is an example endpoint',
    timestamp: new Date().toISOString(),
    tip: 'Add your custom logic here',
  });
});
