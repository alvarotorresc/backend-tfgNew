import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Researcher } from '@prisma/client';

@Injectable()
export class ResearcherService {
  constructor(private readonly prisma: PrismaService) {}

  findResearcherByEmail(email: string): Promise<Researcher | null> {
    return this.prisma.researcher.findOne({ where: { email } });
  }
}
