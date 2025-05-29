import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TypeEntity } from "./type.entity";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity(EntityNames.Menu)
export class MenuEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: "numeric" })
  price: number;

  @Column({ type: "numeric", default: 0 })
  discount: number;

  @Column()
  description: string;

  @Column({ type: "numeric" })
  score: number;

  @Column()
  typeId: string;

  @Column()
  supplierId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.food, {
    onDelete: "CASCADE",
  })
  supplier: SupplierEntity;

  @ManyToOne(() => TypeEntity, (type) => type.items)
  type: TypeEntity;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.food)
  feedbacks: FeedbackEntity[];
}
