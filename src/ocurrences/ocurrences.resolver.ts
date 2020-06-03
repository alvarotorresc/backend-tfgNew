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
import { Roles } from '@/auth/roles.decorator';

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
  @Roles('unauthenticated', 'researcher', 'admin')
  public async getOcurrences(): Promise<Ocurrence[]> {
    return await this.prisma.ocurrence.findMany();
  }

  @Query('getOcurrence')
  @Roles('unauthenticated', 'researcher', 'admin')
  public async getOcurrence(@Args('id') id: string): Promise<Ocurrence | null> {
    return await this.prisma.ocurrence.findOne({
      where: { id: id },
    });
  }

  @Mutation('createOcurrence')
  @Roles('researcher')
  public async createOcurrence(
    @Args('dto') dto: CreateOcurrenceDto,
  ): Promise<Ocurrence | null> {
    const { phenomenaId, ...partial } = dto;

    return this.prisma.ocurrence.create({
      data: {
        ...partial,
        phenomena: {
          connect: {
            id: phenomenaId,
          },
        },
      },
    });
  }

  @Mutation('deleteOcurrence')
  @Roles('researcher')
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
  @Roles('researcher')
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
