import { Module } from '@nestjs/common';
import { OcurrencesService } from './ocurrences.service';
import { OcurrencesResolver } from './ocurrences.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from '@/auth/auth.service';
import { ResearcherService } from '@/researcher/researcher.service';

@Module({
  imports: [PrismaModule],
  providers: [
    OcurrencesService,
    OcurrencesResolver,
    AuthService,
    ResearcherService,
  ],
})
export class OcurrencesModule {}
