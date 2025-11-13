import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Driver } from '../driver/driver.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Vehicle,
            Driver,
        ]),
    ],
    controllers: [],
    providers: [],
})
export class VehicleModule {}
