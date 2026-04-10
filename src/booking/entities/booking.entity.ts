import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum BookingStatus {
  PENDING = 'pending',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookingId: string;

  @Column()
  guestName: string;

  @Column()
  guestEmail: string;

  @Column()
  guestPhone: string;

  @Column()
  roomNumber: string;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date;
}
