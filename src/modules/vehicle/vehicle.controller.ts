import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Post()
    @Roles(UserRole.ADMIN, UserRole.FLEET_MANAGER)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.createVehicle(createVehicleDto);
    }

    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.vehicleService.findOne(id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.FLEET_MANAGER)
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.update(id, updateVehicleDto);
    }
    
    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.FLEET_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.vehicleService.remove(id);
    }
}
