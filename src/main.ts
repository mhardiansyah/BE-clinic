import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import * as admin from 'firebase-admin';
import * as path from 'path';

async function bootstrap() {
  // Gunakan process.cwd() untuk menunjuk ke folder root proyek (backend/)
  const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');

  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        // Gunakan cert() dengan path yang sudah kita rakit
        credential: admin.credential.cert(serviceAccountPath),
      });
      console.log('✅ Firebase Admin Berhasil Inisialisasi dari Folder Root!');
    } catch (error) {
      console.error('❌ Gagal membaca file JSON Cuk! Cek lagi lokasinya.');
      console.error(error);
      process.exit(1); // Hentikan aplikasi jika Firebase gagal
    }
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.useGlobalInterceptors(new TransformInterceptor());
  
  await app.listen(4000);
  console.log('🚀 Server running on: http://localhost:4000');
}
bootstrap();