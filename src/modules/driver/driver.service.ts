import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(Driver)
        private readonly driverRepository: Repository<Driver>,
    ) {}

    async findByUsername(licenseNumber: string): Promise<Driver | null> {
        return this.driverRepository.findOne({
            where: { licenseNumber },
            select: ['id', 'licenseNumber', 'role', 'passwordHash', 'name'],
        });
    }

    async create(driverData: Partial<Driver>): Promise<Driver> {
        if(!driverData.passwordHash) {
            throw new BadRequestException('A senha é obrigatória para o cadastro');
        }

        const hashadPassword = await bcrypt.hash(driverData.passwordHash, 10);

        const newDriver = this.driverRepository.create({
            ...driverData,
            passwordHash: hashadPassword,
        });
        return this.driverRepository.save(newDriver);
    }
}

