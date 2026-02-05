import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import * as admin from 'firebase-admin';
import * as path from 'path'; // Jangan lupa import ini

async function bootstrap() {
  // 1. Ambil path absolut ke file JSON lu
  const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');

  // 2. Inisialisasi Firebase Admin dengan File Cert
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
    console.log('✅ Firebase Admin initialized using serviceAccountKey.json');
  }

  const app = await NestFactory.create(AppModule);
  
  // 3. Aktifkan CORS biar Flutter lu bisa nembak API
  app.enableCors(); 

  app.useGlobalInterceptors(new TransformInterceptor());
  
  // 4. Pastikan port ini sama dengan yang dipanggil di Flutter (4000)
  await app.listen(4000);
  console.log('🚀 Server is running on: http://localhost:4000');
}
bootstrap();