import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';

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
}
