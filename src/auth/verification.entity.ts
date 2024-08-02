import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verifications')
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verification_code: string;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  expires_in: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  verified_at: Date;

  @Column()
  user_id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.verifications)
  user: User;

  constructor(partial: Partial<Verification>) {
    Object.assign(this, partial);
  }
}
