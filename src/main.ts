(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // Tambahkan ini
  await app.listen(4000);
}
bootstrap();