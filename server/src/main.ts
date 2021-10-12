import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from './database/bim.db';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await connect();
  await app.listen(9090);
}
bootstrap();
