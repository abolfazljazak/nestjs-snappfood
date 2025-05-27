import { EntityNames } from "src/common/enum/entity.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { UserAddressEntity } from "./address.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { OtpEntity } from "./otp.entity";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
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

  @Column()
  otpId: string;

  @OneToOne(() => OtpEntity, (otp) => otp.user)
  @JoinColumn()
  otp: OtpEntity;

  @OneToMany(() => UserAddressEntity, (address) => address.user)
  addressList: UserAddressEntity[];

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  update_at: Date;
}
