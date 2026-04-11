import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class StartCheckInDto {
  @ApiProperty({ example: 'BK-X82R9P' })
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({ description: 'Passport image in base64 format or URL' })
  @IsString()
  @IsNotEmpty()
  passportImage: string;

  @ApiProperty({ description: 'Selfie image in base64 format or URL' })
  @IsString()
  @IsNotEmpty()
  selfieImage: string;
}
