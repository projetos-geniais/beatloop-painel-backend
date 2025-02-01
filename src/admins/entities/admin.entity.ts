import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from "class-validator";


@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty({ message: 'O campo Email é obrigatório.' })
    email: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'O campo Senha é obrigatório' })
    senha: string;

    @BeforeInsert()
    async hashSenha() {
        this.senha = await bcrypt.hash(this.senha, 10); // Criptografa antes de salvar
    }
}
