import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { SupplierEntity } from "./supplier.entity";
import { EntityNames } from "src/common/enum/entity.enum";

@Entity(EntityNames.SupplierOtp)
export class SupplierOtpEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  expries_in: Date;

  @Column()
  supplierId: string;

  @OneToOne(() => SupplierEntity, (supplier) => supplier.otp, { onDelete: "CASCADE" })
  supplier: SupplierEntity;
}
