#!/usr/bin/env node
/**
 * Copies .env.example to .env if .env doesn't exist.
 * This runs automatically after npm install (postinstall hook).
 */

import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..');
const examplePath = path.join(rootDir, '.env.example');
const envPath = path.join(rootDir, '.env');

function copyEnvExample(): void {
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('[copy_env] .env file already exists, skipping copy.');
    return;
  }

  // Check if example exists
  if (!fs.existsSync(examplePath)) {
    console.error('[copy_env] .env.example not found!');
    process.exit(1);
  }

  // Copy example to .env
  try {
    fs.copyFileSync(examplePath, envPath);
    console.log('[copy_env] Created .env from .env.example');
    console.log('[copy_env] Please edit .env and add your configuration values.');
  } catch (error) {
    console.error('[copy_env] Failed to copy .env.example:', error);
    process.exit(1);
  }
}

copyEnvExample();
