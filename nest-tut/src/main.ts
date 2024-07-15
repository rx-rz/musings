import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { HTTPExceptionFilter } from 'exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 //global middleware
  //app.use(logger)

  //global scoped
  app.useGlobalFilters(new HTTPExceptionFilter())
  app.listen(3000);
}
bootstrap();
