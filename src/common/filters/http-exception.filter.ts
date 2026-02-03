
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const requestId = request.headers['x-request-id'] || `req_${uuidv4().substring(0, 8)}`;

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: 'Internal Server Error' };

        let message = 'Internal Server Error';
        let errors: any = null;
        let code = 'ERROR';

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object') {
            const resp = exceptionResponse as any;
            message = resp.message || message;
            errors = resp.errors || resp.error || null;
            code = resp.code || 'ERROR';

            // Handle class-validator array of errors
            if (Array.isArray(message)) {
                errors = message;
                message = 'Validation Error';
            }
        }

        response.status(status).json({
            success: false,
            code: code === 'ERROR' && status !== 500 ? 'ClientError' : code, // simplistic mapping
            message: message,
            data: [],
            meta: null,
            errors: errors,
            timestamp: new Date().toISOString(),
            request_id: requestId,
        });
    }
}
