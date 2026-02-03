import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: "SUCCESS",
        message: data?.message || "Message retrieved successfully",
        data: data?.result || data,
        meta: data?.meta || null,
        errors: null,
        timestamp: new Date().toISOString(),
        request_id: `req_${Math.random().toString(36).substring(2, 10)}`,
      })),
    );
  }
}