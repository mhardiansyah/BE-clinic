import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import * as admin from 'firebase-admin';
import * as path from 'path';

// src/main.ts
async function bootstrap() {
  if (!admin.apps.length) {
    const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (serviceAccountVar) {
      // Jika ada di Environment Variable (Vercel/Produksi)
      const serviceAccount = JSON.parse(serviceAccountVar);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('✅ Firebase Admin initialized from Environment Variable');
    } else {
      // Jika di Lokal (menggunakan file fisik)
      const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
      console.log('✅ Firebase Admin initialized from Local File');
    }
  }

  const app = await NestFactory.create(AppModule);
  // ... rest of your code
}
bootstrap();