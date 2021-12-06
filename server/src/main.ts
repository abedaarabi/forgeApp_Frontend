import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from './database/bim.db';
require('dotenv').config({ path: './.env' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await connect();
  await app.listen(process.env.PORT || 9090);
}
bootstrap();
