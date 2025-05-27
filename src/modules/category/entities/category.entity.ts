import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  imageKey: string;

  @Column()
  show: boolean;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.category, {
    onDelete: "SET NULL",
  })
  suppliers: SupplierEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: "CASCADE",
  })
  parent: CategoryEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.parent, {
    onDelete: "CASCADE",
  })
  children: CategoryEntity[];
}
