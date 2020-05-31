import { Module } from '@nestjs/common';
import { PhenomenaService } from './phenomena.service';
import { PhenomenaResolver } from './phenomena.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { ResearcherService } from '../researcher/researcher.service';

@Module({
  imports: [PrismaModule],
  providers: [
    PhenomenaService,
    PhenomenaResolver,
    AuthService,
    ResearcherService,
  ],
})
export class PhenomenaModule {}
