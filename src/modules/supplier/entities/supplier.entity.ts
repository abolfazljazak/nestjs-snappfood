import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { SupplierOtpEntity } from "./supplier-otp.entity";

@Entity(EntityNames.Supplier)
export class SupplierEntity extends BaseEntity {
  @Column()
  manager_name: string;

  @Column()
  manager_family: string;

  @Column()
  phone: string;

  @Column()
  store_name: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.suppliers)
  category: CategoryEntity;

  @Column()
  city: string;

  @Column()
  invite_code: string;

  @Column({ nullable: true })
  agentId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.subsets)
  agent: SupplierEntity;

  @OneToMany(() => SupplierEntity, (supplier) => supplier.agent)
  subsets: SupplierEntity[];

  @Column({ nullable: true })
  otpId: string;

  @OneToOne(() => SupplierOtpEntity, (otp) => otp.supplier)
  @JoinColumn()
  otp: SupplierOtpEntity;
}
