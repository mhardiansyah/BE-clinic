import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Response<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  meta: any;
  errors: any;
  timestamp: string;
  request_id: string;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: 'SUCCESS',
        message: data?.message || 'Message retrieved successfully',
        data: data?.data || data || [], // Handle jika data dibungkus atau raw
        meta: data?.meta || null,
        errors: null,
        timestamp: new Date().toISOString(),
        request_id: `req_${uuidv4().split('-')[0]}`, // Generate ID unik
      })),
    );
  }
}