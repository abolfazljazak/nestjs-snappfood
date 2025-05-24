import { EntityNames } from 'src/common/enum/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(EntityNames.User)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ default: 0 })
  score: number;

  @Column({ unique: true })
  invite_code: string;

  @Column({ nullable: true })
  agentId: number;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  update_at: Date;
}
