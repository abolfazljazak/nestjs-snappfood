import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";

@Entity(EntityNames.UserOtp)
export class OtpEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  expries_in: Date;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  user: UserEntity;
}
