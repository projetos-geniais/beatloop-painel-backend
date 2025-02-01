import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  create(createUsuario: Usuario) {

    try {
      return this.usuarioRepository.save(createUsuario);
    } catch (error) {
      console.error('Erro ao Cadastrar Usuário:', error.message);
      throw new InternalServerErrorException('Erro ao cadastrar Usuário');
    }
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuarioExiste = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuarioExiste) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuarioExiste
  }

  update(id: number, updateUsuario: Usuario) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
