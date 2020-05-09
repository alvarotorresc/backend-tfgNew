import { Module } from '@nestjs/common';
import { PhenomenaService } from './phenomena.service';
import { PhenomenaResolver } from './phenomena.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PhenomenaService, PhenomenaResolver],
})
export class PhenomenaModule {}
