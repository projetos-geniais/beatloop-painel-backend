import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './entities/usuario.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis acessíveis globalmente
    }),
    TypeOrmModule.forFeature([Usuario])

  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { }
