import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService
  ) { }

  async create(adminData: Admin) {
    const admin = this.adminRepository.create(adminData);
    return await this.adminRepository.save(admin);
  }


  async login(email: string, senha: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, admin.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.jwtService.sign({ id: admin.id, email: admin.email });
    console.log(token);

    return { token };
  }


  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    console.log(id);

    if (!admin) {
      throw new NotFoundException(`Admin com ID ${id} não encontrado.`);
    }
    return admin
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async delete(id: number): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    try {
      if (!admin) {
        return { message: `Admin com ID ${id} não encontrado.` };
      }

      await this.adminRepository.remove(admin);
      return { message: `Admin com ID ${id} deletado com sucesso.` };
    } catch (error) {
      throw new NotFoundException(`Erro na rota de deletar admins. ${error.message}`);
    }

  }
}
