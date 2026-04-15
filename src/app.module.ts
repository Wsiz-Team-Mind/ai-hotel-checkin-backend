import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { BookingModule } from './booking/booking.module';
import { Staff } from './staff/entities/staff.entity';
import { Booking } from './booking/entities/booking.entity';
import { CheckInModule } from './checkin/checkin.module';
import { CheckIn } from './checkin/entities/checkin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Staff, Booking, CheckIn],
        synchronize: true,
      }),
    }),
    AuthModule,
    StaffModule,
    BookingModule,
    CheckInModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
