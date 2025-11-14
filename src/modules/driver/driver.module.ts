import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Driver]),
    ],
    controllers: [],
    providers: [DriverService],
    exports: [DriverService],
})
export class DriverModule {}
