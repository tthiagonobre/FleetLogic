import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
} from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { Vehicle } from '../vehicle/vehicle.entity';


@Entity('drivers', { schema: 'fleet' })
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    // CNH - Carteira Nacional de Habilitação
    @Index({ unique: true })
    @Column({ type: 'varchar', length: 100, unique: true })
    licenseNumber: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.DRIVER,
    })
    role: UserRole;

    // Autenticação e segurança
    @Column({ type: 'varchar', select:false, nullable: true }) // select: false omite por padrão
    passwordHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    vehicles: Vehicle[];
}