import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

export enum CheckInStatus {
  PENDING = 'pending',      // Initial state before AI processing
  COMPLETED = 'completed', 
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CheckInStatus,
    default: CheckInStatus.PENDING,
  })
  status: CheckInStatus;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  /** 
   * Data extracted from the passport
   */
  @Column({ nullable: true })
  extractedFirstName: string;

  @Column({ nullable: true })
  extractedLastName: string;

  @Column({ nullable: true })
  extractedPassportNumber: string;

  /**
   * Confidence score from face matching 
   * A value between 0 and 1
   */
  @Column({ type: 'float', nullable: true })
  faceMatchScore: number;

  /**
   * References to images stored in the system
   */
  @Column({ nullable: true })
  passportImageId: string;

  @Column({ nullable: true })
  selfieImageId: string;

  /**
   * The generated QR code for room access after successful check-in
   */
  @Column({ nullable: true })
  accessQrCode: string;

  @CreateDateColumn()
  checkedInAt: Date;
}
