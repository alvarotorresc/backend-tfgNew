import { Module } from '@nestjs/common';
import { ResearcherResolver } from './researcher.resolver';
import { ResearcherService } from './researcher.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ResearcherResolver, ResearcherService],
})
export class ResearcherModule {}
