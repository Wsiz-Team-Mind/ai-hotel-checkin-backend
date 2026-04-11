import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CheckInService } from './checkin.service';
import { StartCheckInDto } from './dto/start-checkin.dto';

@ApiTags('checkin')
@Controller('checkin')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start the AI check-in process with passport and face scan' })
  startCheckIn(@Body() dto: StartCheckInDto) {
    return this.checkInService.startCheckIn(dto);
  }
}
