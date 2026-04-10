import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginBookingDto {
  @ApiProperty({ example: 'BK-123456' })
  @IsString()
  bookingId: string;
}
