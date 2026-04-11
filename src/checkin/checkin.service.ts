import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckIn, CheckInStatus } from './entities/checkin.entity';
import { Booking } from '../booking/entities/booking.entity';
import { StartCheckInDto } from './dto/start-checkin.dto';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckIn)
    private checkInRepository: Repository<CheckIn>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async startCheckIn(dto: StartCheckInDto): Promise<CheckIn> {
    // Verify if the booking exists
    const booking = await this.bookingRepository.findOneBy({ bookingId: dto.bookingId });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Create a new Check-in session in PENDING status
    const checkIn = this.checkInRepository.create({
      booking: booking,
      status: CheckInStatus.PENDING,
      // We store the image references (placeholders for now)
      passportImageId: 'temp_passport_ref', 
      selfieImageId: 'temp_selfie_ref',
    });

    const savedCheckIn = await this.checkInRepository.save(checkIn);

    // TODO: Call AI here
    // For now, we return the session to confirm the start
    return savedCheckIn;
  }
}
