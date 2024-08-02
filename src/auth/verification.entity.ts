import {
  Column,
  CreateDateColumn,
  Entity,
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
  expiresIn: number;

  @Column({ nullable: true, type: 'timestamptz' })
  verified_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  constructor(partial: Partial<Verification>) {
    Object.assign(this, partial);
  }
}
