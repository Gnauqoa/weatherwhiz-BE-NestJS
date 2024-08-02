import { Exclude, Expose } from 'class-transformer';
import * as bcyrpt from 'bcryptjs';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  birth: Date;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true, default: null })
  location_id: number;

  @Column({ nullable: false, default: false })
  notification_each_day: boolean;

  @Column({ default: null, nullable: true })
  location_query: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, default: bcyrpt.hashSync('123456', 10) })
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
