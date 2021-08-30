import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './controllers/item.controller';
import { ProjectController } from './controllers/project.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, ItemController],
  providers: [AppService],
})
export class AppModule {}
