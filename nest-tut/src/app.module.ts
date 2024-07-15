import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({
      //so you don't have to import it in any other module
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('cats');
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    //or
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);

    //multiple middleware
    //consumer.apply(cors(), helmet(), logger, LoggerMiddleware).forRoutes('cats');

    //for specific route
    //   consumer
    //     .apply(LoggerMiddleware)

    //     .forRoutes({ path: 'cats', method: RequestMethod.GET });

    //exclude a route
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes('cats');
  }
}
