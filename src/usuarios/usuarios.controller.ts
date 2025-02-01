import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuario: Usuario) {

    try {
      return this.usuariosService.create(createUsuario);
    } catch (error) {
      // Se for um erro do banco, trata aqui
      if (error.code === '23502') {  // Código de erro para NOT NULL em PostgreSQL
        throw new HttpException(`O campo ${error.column} é obrigatório`, HttpStatus.BAD_REQUEST);
      }
      // Erro genérico
      throw new HttpException('Erro ao cadastrar música', HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuario: Usuario) {
    return this.usuariosService.update(+id, updateUsuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
