import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enum/entity.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { SupplierEntity } from "./supplier.entity";

@Entity(EntityNames.SupplierDocs)
export class SupplierDocsEntity extends BaseEntity {
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  document: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.documents)
  supplier: SupplierEntity;

  @Column()
  supplierId: string;
}
