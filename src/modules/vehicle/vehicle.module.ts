import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Driver } from '../driver/driver.entity';
import { VehicleService } from './vehicle.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Vehicle,
            Driver,
        ]),
    ],
    controllers: [],
    providers: [VehicleService],
})
export class VehicleModule {}
