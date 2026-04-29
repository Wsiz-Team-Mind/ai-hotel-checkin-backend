import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './entities/checkin.entity';
import { Booking } from '../booking/entities/booking.entity';
import { CheckInService } from './checkin.service';
import { CheckInController } from './checkin.controller';
import { CheckInGateway } from '../core/gateways/checkin.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Booking])],
  controllers: [CheckInController],
  providers: [CheckInService, CheckInGateway],
  exports: [CheckInService, CheckInGateway],
})
export class CheckInModule {}
