import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admins')

export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  create(@Body() adminData: Admin) {
    return this.adminsService.create(adminData);
  }

  @Post('login')
  login(@Body() { email, senha }: { email: string; senha: string }) {
    return this.adminsService.login(email, senha);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // ✅ Protege a rota com JWT
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // ✅ Protege a rota com JWT
  async findOne(@Param('id', new ParseIntPipe({ exceptionFactory: (error) => new BadRequestException('O ID precisa ser um número válido.') })) id: number) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // ✅ Protege a rota com JWT
  async delete(@Param('id', new ParseIntPipe({ exceptionFactory: (error) => new BadRequestException('O ID precisa ser um número válido.') })) id: number) {
    return this.adminsService.delete(id);
  }
}
