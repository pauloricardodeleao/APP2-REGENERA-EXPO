/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Root Application Module
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Future Modules:
    // AuthModule,
    // TransactionModule,
    // AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}