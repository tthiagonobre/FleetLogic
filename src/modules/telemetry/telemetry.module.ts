import { Module } from '@nestjs/common';
import { TelemetryGateway } from './telemetry.gateway';
import { TelemetryController } from './telemetry.controller';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [
    VehicleModule,
  ],
  providers: [TelemetryGateway],
  controllers: [TelemetryController],
})
export class TelemetryModule {}
