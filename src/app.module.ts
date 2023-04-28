import { MiddlewareConsumer, Module, ModuleMetadata, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './user/user.module';

import { HttpModule } from '@nestjs/axios';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AvailabilityModule } from './availability/availability.module';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl, headers, body } = request;

    const hasuraHeaders = Object.keys(headers).reduce<Record<string, any>>((acc, key) => {
      if (key.startsWith('x-hasura')) {
        const h = headers[key];
        if (h) {
          acc[key] = h;
          return acc;
        }
      }
      return acc;
    }, {});

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${baseUrl} ${statusCode} ${contentLength} -- ${JSON.stringify(hasuraHeaders)} -- ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
            playground: true,
            autoSchemaFile: 'schema.graphql',
            sortSchema: true,
        }
      },
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => {
        return {
          dialect: 'sqlite',
          storage: 'database.sqlite'
        }
      },
    }),
    UserModule,
    AvailabilityModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
