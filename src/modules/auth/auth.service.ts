import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Driver } from '../driver/driver.entity';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly driverService: DriverService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(licenseNumber :string, pass: string): Promise<any> {
        const driver =  await this.driverService.findByUsername(licenseNumber);

        if (driver && driver.passwordHash) {
            const isMatch = await bcrypt.compare(pass, driver.passwordHash);

            if (isMatch) {
                const { passwordHash, ...result } = driver;
                return result;
            }
        }
        throw new UnauthorizedException('Credenciais de login inválidas');
    }

    async login(user: Driver) {
        const payload = {
            licenseNumber: user.licenseNumber,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
