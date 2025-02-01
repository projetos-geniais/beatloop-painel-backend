import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minhaChaveSecreta', // Defina a chave secreta
      signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
    }),
  ], // Importação correta do repositório
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService], // Exporta caso precise usar em outro módulo
})
export class AdminsModule { }
