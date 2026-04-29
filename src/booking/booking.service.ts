import { Injectable, NotFoundException, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CheckInGateway } from '../core/gateways/checkin.gateway';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @Inject(forwardRef(() => CheckInGateway))
    private checkInGateway: CheckInGateway,
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

  async findOneByBookingId(bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { bookingId: bookingId },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    return booking;
  }

  async updateStatus(bookingId: string, updateData: { status: BookingStatus }) {
    const booking = await this.findOneByBookingId(bookingId);

    booking.status = updateData.status;
    const updatedBooking = await this.bookingRepository.save(booking);

    if (this.checkInGateway?.server) {
      this.checkInGateway.server.to(bookingId).emit('checkInStatus', {
        bookingId: bookingId,
        status: updatedBooking.status,
        data: { 
          guestName: updatedBooking.guestName,
        }
      });
    }

    return updatedBooking;
  }
}
