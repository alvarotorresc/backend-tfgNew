import {
  Resolver,
  Args,
  Mutation,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Researcher, Phenomena } from '@prisma/client';
import {
  CreateResearcherDto,
  DeleteReseacherDto,
  UpdateResearcherDto,
} from '../graphql.types';
import { AuthService } from '@/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { ResearcherService } from './researcher.service';

@Resolver('Researcher')
@UseGuards(AuthGuard)
export class ResearcherResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly researcherService: ResearcherService,
  ) {}

  @ResolveField('phenomena')
  public async phenomena(
    @Parent() researcher: Researcher,
  ): Promise<Phenomena[]> {
    const { id } = researcher;
    return this.prisma.phenomena.findMany({
      where: { researcherId: id },
    });
  }

  @Query('researchers')
  @Roles('unauthenticated')
  public async researchers(): Promise<Researcher[]> {
    return await this.prisma.researcher.findMany();
  }

  @Query('researcher')
  @Roles('unauthenticated')
  public async researcher(@Args('id') id: string): Promise<Researcher | null> {
    return await this.prisma.researcher.findOne({
      where: { id: id },
    });
  }

  @Mutation('createResearcher')
  @Roles('admin') //FIX: role admin
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

    const hash = await this.authService.hashPassword(password);

    const existingResearcher = await this.researcherService.findResearcherByEmail(
      email,
    );

    console.log(existingResearcher);

    if (existingResearcher) {
      throw new Error('existing_researcher');
    }

    return this.prisma.researcher.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        image,
        age,
        rol,
        nationality,
      },
    });
  }

  @Mutation('deleteResearcher')
  @Roles('admin') //FIX: role admin
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
  @Roles('admin') //FIX: role admin
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
