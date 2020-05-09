import { Module } from '@nestjs/common';
import { OcurrencesService } from './ocurrences.service';
import { OcurrencesResolver } from './ocurrences.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OcurrencesService, OcurrencesResolver],
})
export class OcurrencesModule {}
