import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async register(dto: CreateStaffDto): Promise<Staff> {
    const exists = await this.staffRepository.findOneBy({ email: dto.email });
    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const staff = this.staffRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.staffRepository.save(staff);
  }

  async login(dto: LoginStaffDto): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'email', 'name', 'role', 'password', 'createdAt'],
    });

    if (!staff) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, staff.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password, ...result } = staff;
    return result as Staff;
  }

  findAll(): Promise<Staff[]> {
    return this.staffRepository.find();
  }

  findOneByEmail(email: string): Promise<Staff | null> {
    return this.staffRepository.findOneBy({ email });
  }

  findOneById(id: number): Promise<Staff | null> {
    return this.staffRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({ id });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(staff, dto);
    return this.staffRepository.save(staff);
  }

  async remove(id: number): Promise<void> {
    const staff = await this.staffRepository.findOneBy({ id });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    await this.staffRepository.remove(staff);
  }
}
