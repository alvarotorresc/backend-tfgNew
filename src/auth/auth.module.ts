import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthGuard } from './auth.guard';
import { ResearcherService } from '../researcher/researcher.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthResolver, AuthService, AuthGuard, ResearcherService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
