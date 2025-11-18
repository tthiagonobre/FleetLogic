import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Driver } from '../driver/driver.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { TelemetryUpdateDto } from './dto/telemetry-update.dto';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Driver)
        private readonly driverRepository: Repository<Driver>,
    ) {}

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const newVehicle = this.vehicleRepository.create(createVehicleDto);
        return this.vehicleRepository.save(newVehicle);
    }

    findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.find({
            relations: {
                driver: true,
            } 
        });
    }

    async findOne(id: string): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: {
                driver: true,
            }
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }
        return vehicle;
    }

    async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.preload({
            id,
            ...updateVehicleDto,
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }

        return this.vehicleRepository.save(vehicle);
    }

    async remove(id: string): Promise<void> {
        const vehicle = await this.findOne(id);
        await this.vehicleRepository.remove(vehicle);
    }       

    async updateTelemetry(
        id: string,
        telemetryUpdateDto: TelemetryUpdateDto,
    ): Promise<void> {
        const result = await this.vehicleRepository.update(id, telemetryUpdateDto);

        if (result.affected === 0) {
            throw new NotFoundException(`Veículo com ID ${id} não encontrado`);
        }    
    }
}
