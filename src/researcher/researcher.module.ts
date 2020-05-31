import { Module } from '@nestjs/common';
import { ResearcherResolver } from './researcher.resolver';
import { ResearcherService } from './researcher.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule],
  providers: [ResearcherResolver, ResearcherService, AuthService],
})
export class ResearcherModule {}
