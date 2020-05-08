import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Query } from '@nestjs/graphql';
import { Researcher } from '@prisma/client';
import {
  CreateResearcherDto,
  DeleteReseacherDto,
  UpdateResearcherDto,
} from '../graphql.types';

@Resolver('Researcher')
export class ResearcherResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query('researchers')
  public async researchers(): Promise<Researcher[]> {
    return await this.prisma.researcher.findMany();
  }

  @Query('researcher')
  public async researcher(@Args('id') id: string): Promise<Researcher | null> {
    return await this.prisma.researcher.findOne({
      where: { id: id },
    });
  }

  @Mutation('createResearcher')
  public async createResearcher(
    @Args('dto') dto: CreateResearcherDto,
  ): Promise<Researcher | null> {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      age,
      nationality,
      rol,
    } = dto;

    return this.prisma.researcher.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        image,
        age,
        rol,
        nationality,
      },
    });
  }

  @Mutation('deleteResearcher')
  public async deleteResearcher(
    @Args('dto') dto: DeleteReseacherDto,
  ): Promise<boolean> {
    const { researcherId } = dto;
    try {
      await this.prisma.researcher.delete({ where: { id: researcherId } });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation('updateResearcher')
  public async updateResearcher(
    @Args('dto') dto: UpdateResearcherDto,
  ): Promise<Researcher | null> {
    const { researcherId, ...partial } = dto;

    return await this.prisma.researcher.update({
      where: {
        id: researcherId,
      },
      data: partial,
    });
  }
}
