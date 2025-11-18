import { IsLatitude, IsLongitude, IsDateString } from "class-validator";

export class TelemetryUpdateDto {
    @IsLatitude()
    lastLatitude: number;

    @IsLongitude()
    lastLongitude: number;

    @IsDateString()
    lastTelemetryUpdate: Date;
}