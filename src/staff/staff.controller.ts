import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('register')
  register(@Body() dto: CreateStaffDto) {
    return this.staffService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginStaffDto) {
    return this.staffService.login(dto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.staffService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.staffService.remove(id);
  }
}
