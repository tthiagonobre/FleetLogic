import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        this.logger.error(
            `TypeORM Error - ${request.method} ${request.url}: ${exception.message}`,
            exception.stack,
        );

        if ((exception.driverError as any)?.code === '23505') {
            status = HttpStatus.CONFLICT; // 409 Conflict
            message = 'O recurso que você está tentando criar já existe (violação de restrição única).';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}