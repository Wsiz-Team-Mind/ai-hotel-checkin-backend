import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './entities/checkin.entity';
import { Booking } from '../booking/entities/booking.entity';
import { CheckInService } from './checkin.service';
import { CheckInController } from './checkin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Booking])],
  controllers: [CheckInController],
  providers: [CheckInService],
  exports: [CheckInService],
})
export class CheckInModule {}
