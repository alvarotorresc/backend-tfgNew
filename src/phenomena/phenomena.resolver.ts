import {
  Resolver,
  Args,
  Mutation,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Phenomena, Researcher, Ocurrence } from '@prisma/client';
import {
  DeletePhenomenonDto,
  UpdatePhenomenonDto,
  CreatePhenomenonDto,
} from '../graphql.types';

@Resolver('Phenomena')
export class PhenomenaResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField('researcher')
  public async researcher(
    @Parent() phenomena: Phenomena,
  ): Promise<Researcher | null> {
    const { researcherId } = phenomena;
    return this.prisma.researcher.findOne({
      where: { id: researcherId },
    });
  }

  @ResolveField('ocurrences')
  public async ocurrences(
    @Parent() phenomena: Phenomena,
  ): Promise<Ocurrence[]> {
    const { id } = phenomena;
    return this.prisma.ocurrence.findMany({
      where: { phenomenaId: id },
    });
  }

  @Query('getPhenomena')
  public async getPhenomena(): Promise<Phenomena[]> {
    return await this.prisma.phenomena.findMany();
  }

  @Query('getPhenomenon')
  public async getPhenomenon(
    @Args('id') id: string,
  ): Promise<Phenomena | null> {
    return await this.prisma.phenomena.findOne({
      where: { id: id },
    });
  }

  @Mutation('createPhenomenon')
  public async createPhenomenon(
    @Args('dto') dto: CreatePhenomenonDto,
  ): Promise<Phenomena | null> {
    const { title, description, type, researcherId } = dto;

    return this.prisma.phenomena.create({
      data: {
        title,
        description,
        type,
        researcher: {
          connect: {
            id: researcherId,
          },
        },
      },
    });
  }

  @Mutation('deletePhenomenon')
  public async deletePhenomenon(
    @Args('dto') dto: DeletePhenomenonDto,
  ): Promise<boolean> {
    const { phenomenonId } = dto;
    try {
      await this.prisma.phenomena.delete({ where: { id: phenomenonId } });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation('updatePhenomenon')
  public async updatePhenomenon(
    @Args('dto') dto: UpdatePhenomenonDto,
  ): Promise<Phenomena | null> {
    const { phenomenonId, ...partial } = dto;

    return await this.prisma.phenomena.update({
      where: {
        id: phenomenonId,
      },
      data: partial,
    });
  }
}
