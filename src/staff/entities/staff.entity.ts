import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum StaffRole {
  ADMIN = 'admin',
  WORKER = 'worker',
}

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StaffRole, default: StaffRole.WORKER })
  role: StaffRole;

  @CreateDateColumn()
  createdAt: Date;
}
