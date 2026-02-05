import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import * as admin from 'firebase-admin';
import * as path from 'path';

async function bootstrap() {
  // 1. Inisialisasi Firebase Admin
  if (!admin.apps.length) {
    const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (serviceAccountVar) {
      // MODE PRODUCTION (VERCEL): Baca dari Environment Variable
      try {
        const serviceAccount = JSON.parse(serviceAccountVar);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase Admin initialized from Environment Variable');
      } catch (e) {
        console.error('❌ Gagal parse FIREBASE_SERVICE_ACCOUNT Cuk!', e);
      }
    } else {
      // MODE LOKAL: Baca dari file serviceAccountKey.json
      const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
      console.log('✅ Firebase Admin initialized from Local File');
    }
  }

  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); // WAJIB buat Flutter
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Vercel akan otomatis mengatur port, lokal pakai 4000
  await app.listen(process.env.PORT || 4000);
}
bootstrap();