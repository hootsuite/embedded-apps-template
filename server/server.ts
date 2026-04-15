/**
 * Hootsuite Embedded App - Backend Server
 * 
 * Express server that handles:
 * - API endpoints for the frontend
 * - OAuth authentication flow (stub)
 * - Proxy requests to Hootsuite API
 * - Health checks
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router as apiRouter } from './routes/api';

// Load environment variables
config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:8080',
  `http://localhost:${process.env.FRONTEND_PORT || 8080}`,
  'https://hootsuite.com',
  'https://www.hootsuite.com',
  'https://platform.hootsuite.com',
  process.env.HOOTSUITE_DASHBOARD_URL,
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Check if origin matches Hootsuite patterns
      const hootsuitePattern = /^https:\/\/([\w-]+\.)?hootsuite\.com$/;
      if (hootsuitePattern.test(origin)) {
        return callback(null, true);
      }

      // In development, allow localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Hootsuite Embedded App Backend',
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
app.use('/api', apiRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server] Error:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🔧 Hootsuite Embedded App Backend');
  console.log('='.repeat(50));
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 API base: http://localhost:${PORT}/api`);
  console.log('\n' + '='.repeat(50) + '\n');
});

export default app;
