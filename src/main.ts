import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import * as admin from 'firebase-admin';


async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // Tambahkan ini
  await app.listen(4000);
}
bootstrap();