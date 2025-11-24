import { Controller, Get } from "@nestjs/common";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: 'Verifica o estado de saúde da aplicação (DB, Memória, HTTP)' })
    check() {
        return this.health.check([
            // 1. Verifica se consegue pingar um site externo (ex: google) para testar rede
            () => this.http.pingCheck('nest-docs', 'https://docs.nestjs.com'),
            // 2. Verifica a conexão com o BD
            () => this.db.pingCheck('database'),
            // 3. Verifica se a memória Heap não passou de 150MB
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        ]);
    }
}