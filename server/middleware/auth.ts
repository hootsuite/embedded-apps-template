/**
 * Authentication Middleware
 * 
 * Middleware for validating JWT tokens and protecting routes.
 * 
 * NOTE: This is a STUB implementation. The actual JWT validation will be
 * implemented when the Hootsuite platform authentication API is defined.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Extended Request interface with user information.
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    organizationId: string;
    appId: string;
  };
}

/**
 * JWT authentication middleware.
 * 
 * Validates the Authorization header contains a valid JWT token.
 * On success, adds user information to the request object.
 * 
 * STUB: Currently bypasses validation in development mode.
 * 
 * @example
 * ```typescript
 * router.get('/protected', requireAuth, (req: AuthenticatedRequest, res) => {
 *   res.json({ userId: req.user?.id });
 * });
 * ```
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authorization header is required',
    });
    return;
  }

  // Extract token from "Bearer <token>" format
  const [scheme, token] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer' || !token) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authorization format. Expected: Bearer <token>',
    });
    return;
  }

  // STUB: In production, validate JWT here
  // TODO: Verify JWT signature using Hootsuite's public key
  // TODO: Check token expiration
  // TODO: Extract user information from token payload

  console.warn('[Auth Middleware] JWT validation is stubbed - bypassing in development');

  // STUB: Add mock user to request
  req.user = {
    id: 'mock-user-123',
    organizationId: 'mock-org-456',
    appId: process.env.HOOTSUITE_APP_ID || 'mock-app-id',
  };

  next();
}

/**
 * Optional authentication middleware.
 * 
 * Attempts to authenticate but allows request to proceed even if
 * authentication fails. Use for endpoints that have different behavior
 * for authenticated vs unauthenticated users.
 */
export function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // No auth header - continue without user
    next();
    return;
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer' || !token) {
    // Invalid format - continue without user
    next();
    return;
  }

  // STUB: Would validate token and set user if valid
  req.user = {
    id: 'mock-user-123',
    organizationId: 'mock-org-456',
    appId: process.env.HOOTSUITE_APP_ID || 'mock-app-id',
  };

  next();
}
