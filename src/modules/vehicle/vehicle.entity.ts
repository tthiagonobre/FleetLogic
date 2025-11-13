import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { VehicleStatus } from '../../common/enums/vehicle-status.enum';

@Entity('vehicles', { schema: 'fleet' })
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 15, unique: true })
    plate: string;

    @Column({ type: 'varchar', length: 100 })
    model: string;

    @Column({ type: 'varchar', length: 100 })
    make: string; //Fabricante

    @Column({ type: 'int' })
    year: number;

    @Column({
        type: 'enum',
        enum: VehicleStatus,
        default: VehicleStatus.IDLE,
    })
    status: VehicleStatus;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    lastLatitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    lastLongitude: number;

    @Column({ type: 'timestamp', nullable: true })
    lastTelemetryUpdate: Date;

    @Column({ type: 'uuid', nullable: true })
    driverId: string | null;

    @ManyToOne(() => Driver, (driver) => driver.vehicles, {
        nullable: true, 
        onDelete: 'SET NULL' 
    })
    @JoinColumn({ name: 'driverId' })
    driver: Driver;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}