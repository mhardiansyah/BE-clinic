import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    response.status(status).json({
      success: false,
      code: status === 401 ? 'UNAUTHORIZED' : (status === 404 ? 'NOT_FOUND' : 'ERROR'),
      message: exceptionResponse.message || 'Something went wrong',
      data: [],
      meta: null,
      errors: exceptionResponse,
      timestamp: new Date().toISOString(),
      request_id: `req_${uuidv4().split('-')[0]}`,
    });
  }
}