import process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

process.on('unhandledRejection', (reason, _promise) => {
  console.warn('Promise UnhandledRejection Error', reason);
});

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  await app.listen(8081);
  logger.log(`\n\n################ Starting server on port 8081 ################\n`);
}
bootstrap();
