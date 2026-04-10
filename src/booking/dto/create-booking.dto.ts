import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  guestName: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  guestEmail: string;

  @ApiProperty({ example: '+77001234567' })
  @IsString()
  guestPhone: string;

  @ApiProperty({ example: '101' })
  @IsString()
  roomNumber: string;

  @ApiProperty({ example: '2026-04-10' })
  @IsString()
  checkInDate: string;

  @ApiProperty({ example: '2026-04-15' })
  @IsString()
  checkOutDate: string;
}
