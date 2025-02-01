import { IsNotEmpty, IsString } from "class-validator";
import { error } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: `O campo name é obrigatório.` })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    verificationCode: string;

    @Column({ default: false })
    isVerified: boolean

    @Column({ type: 'timestamp', nullable: true })
    verificationCodeExpiry: Date;

    @Column('text')
    profileImage: string;

    @Column('text')
    loginWith: string

    @Column('text')
    profileBanner: string;
}
