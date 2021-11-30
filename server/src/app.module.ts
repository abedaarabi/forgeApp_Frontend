import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './controllers/item.controller';
import { ProjectController } from './controllers/project.controller';
import { TrackingMiddleware } from './middlewares/tracking.middleware';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, ItemController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrackingMiddleware)
      .forRoutes({ path: 'projects/*', method: RequestMethod.GET });
  }
}
