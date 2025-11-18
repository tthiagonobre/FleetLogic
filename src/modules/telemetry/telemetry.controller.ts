import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { TelemetryGateway } from './telemetry.gateway';
import { VehicleService } from '../vehicle/vehicle.service';

@Controller()
export class TelemetryController {
    private logger = new Logger('TelemetryController (MQTT)');

    constructor(
        private readonly telemetryGateway: TelemetryGateway,
        private readonly vehicleService: VehicleService,
    ) {}

    @MessagePattern('fleet/telemetry/+')
    async handleTelemetryMessage(@Payload() data: any, @Ctx() context: MqttContext) {
        const topic = context.getTopic();
        this.logger.log(`MQTT: Dados recebidos no tópico: ${topic}`)

        let payload = data;

        if (typeof data === 'string') {
            try {
                payload = JSON.parse(data);
            } catch (error) {
                this.logger.error(`MQTT: Falha ao parsear payload JSON: ${error.message}`);
                return;
            }
        }

        this.logger.log(`MQTT: Payload Processado: ${JSON.stringify(payload)}`);
        
        const { vehicleId, latitude, longitude } = payload;

        if (!vehicleId) {
            this.logger.warn(`MQTT: recebida sem vehicleId no tópico: ${topic}`);
            return;
        }

        try {
            await this.vehicleService.updateTelemetry(vehicleId, {
                lastLatitude: latitude,
                lastLongitude: longitude,
                lastTelemetryUpdate: new Date(),
        }); 

            this.telemetryGateway.sendTelemetryUpdate(vehicleId, payload);

        } catch (error) {
            this.logger.error(`Falha ao atualizar telemetria para vehicleId[${vehicleId}]: ${error.message}`);
        }
    }
}
