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
import { CreateOcurrenceDto } from '@/graphql.types';
import { DeleteOcurrenceDto, UpdateOcurrenceDto } from '../graphql.types';

@Resolver('Ocurrence')
export class OcurrencesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField('phenomena')
  public async phenomena(
    @Parent() ocurrence: Ocurrence,
  ): Promise<Phenomena | null> {
    const { phenomenaId } = ocurrence;
    return this.prisma.phenomena.findOne({
      where: { id: phenomenaId },
    });
  }

  @Query('getOcurrences')
  public async getOcurrences(): Promise<Ocurrence[]> {
    return await this.prisma.ocurrence.findMany();
  }

  @Query('getOcurrence')
  public async getOcurrence(@Args('id') id: string): Promise<Ocurrence | null> {
    return await this.prisma.ocurrence.findOne({
      where: { id: id },
    });
  }

  @Mutation('createOcurrence')
  public async createOcurrence(
    @Args('dto') dto: CreateOcurrenceDto,
  ): Promise<Ocurrence | null> {
    const { phenomenaId, date, description, witness, resolved } = dto;

    return this.prisma.ocurrence.create({
      data: {
        date,
        description,
        witness,
        resolved,
        phenomena: {
          connect: {
            id: phenomenaId,
          },
        },
      },
    });
  }

  @Mutation('deleteOcurrence')
  public async deleteOcurrence(
    @Args('dto') dto: DeleteOcurrenceDto,
  ): Promise<boolean> {
    const { ocurrenceId } = dto;
    try {
      await this.prisma.ocurrence.delete({ where: { id: ocurrenceId } });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation('updateOcurrence')
  public async updateOcurrence(
    @Args('dto') dto: UpdateOcurrenceDto,
  ): Promise<Ocurrence | null> {
    const { ocurrenceId, ...partial } = dto;

    return await this.prisma.ocurrence.update({
      where: {
        id: ocurrenceId,
      },
      data: partial,
    });
  }
}
