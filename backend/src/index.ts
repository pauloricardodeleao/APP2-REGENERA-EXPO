/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Serverless Entry Point
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] backend/src/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();

// Singleton Promise to ensure Nest is initialized only once (Cold Start Optimization)
const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Security & Middleware
  app.enableCors({ origin: true }); // In production, restrict to app domain
  
  await app.init();
};

// Initialize the promise
const nestPromise = createNestServer(server);

// Export the Cloud Function
export const api = functions.https.onRequest(async (req, res) => {
  await nestPromise;
  // Fix: Cast req and res to any to resolve type mismatch between Firebase and Express
  server(req as any, res as any);
});