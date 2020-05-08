import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { ResearcherModule } from './researcher/researcher.module';
import { PhenomenaModule } from './phenomena/phenomena.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      introspection: true,
      typePaths: [resolve(__dirname, './**/*.graphql')],
      context: (req) => ({ req, __gqlContext: true }),
      fieldResolverEnhancers: ['guards'],
    }),
    ResearcherModule,
    PhenomenaModule,
  ],
})
export class AppModule {}
