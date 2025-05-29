import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuEntity } from "./menu.entity";

Entity(EntityNames.MenuType);
export class TypeEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  supplierId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.menuTypes, {
    onDelete: "CASCADE",
  })
  supplier: SupplierEntity;

  @OneToMany(() => MenuEntity, (food) => food.type)
  items: MenuEntity;
}
