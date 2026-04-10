import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const bookingId = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const booking = this.bookingRepository.create({
      ...dto,
      bookingId,
    });

    return this.bookingRepository.save(booking);
  }

  async login(bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ bookingId });
    if (!booking) {
      throw new UnauthorizedException('Invalid booking ID');
    }
    return booking;
  }

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }
}
