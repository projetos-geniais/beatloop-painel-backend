import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis acessíveis globalmente
    }),
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minhaChaveSecreta', // Defina a chave secreta
      signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
    }),

  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { }
