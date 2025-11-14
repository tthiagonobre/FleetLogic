import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Driver } from '../driver/driver.entity';
import { DriverService } from '../driver/driver.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly driverService: DriverService,
    ) {}

    @Post('register')
    async register(@Body() driverData: any): Promise<Driver> {
        return this.driverService.create(driverData);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { licenseNumber, password } = loginDto;
        const user = await this.authService.validateUser(licenseNumber, password);
        return this.authService.login(user);
    }
}
