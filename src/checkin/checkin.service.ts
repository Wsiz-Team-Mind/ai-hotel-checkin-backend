import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckIn, CheckInStatus } from './entities/checkin.entity';
import { Booking } from '../booking/entities/booking.entity';
import { StartCheckInDto } from './dto/start-checkin.dto';
import { CheckInGateway } from '../core/gateways/checkin.gateway';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckIn)
    private checkInRepository: Repository<CheckIn>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private readonly checkInGateway: CheckInGateway,
  ) {}

  async startCheckIn(dto: StartCheckInDto): Promise<CheckIn> {
    // Validate input bookingId against Database
    const booking = await this.bookingRepository.findOneBy({ bookingId: dto.bookingId });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // TO DO: Replace 'temp_ref' with URLs after file upload
    const checkIn = this.checkInRepository.create({
      booking: booking,
      status: CheckInStatus.PENDING,
      passportImageId: 'temp_passport_ref', 
      selfieImageId: 'temp_selfie_ref',
    });

    const savedCheckIn = await this.checkInRepository.save(checkIn);

    // Notify Frontend that the bg process (AI) has started
    // IMPORTANT: 'status' and 'message' keys must match the Frontend's Socket listener
    this.checkInGateway.sendCheckInUpdate(dto.bookingId, {
      status: 'PROCESSING',
      message: 'Processing started...',
      timestamp: new Date().toISOString()
    });

    // TO DO: Integrate Python AI Service
    // CURRENT: 'setTimeout' simulates the latency of the AI process
    setTimeout(async () => {
      const mockAiData = {
        status: 'COMPLETED',
        data: {
          firstName: 'Jon',
          lastName: 'Doe',
          passportNumber: '123',
          birthDate: '1995-05-15'
        }
      };

      this.checkInGateway.sendCheckInUpdate(dto.bookingId, mockAiData);
      
      console.log(`AI results sent for booking: ${dto.bookingId}`);
    }, 3000);

    return savedCheckIn;
  }
}
