import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityNames } from 'src/common/enum/entity.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  image: string;

  @Column()
  show: boolean;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  parent: CategoryEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.parent, {
    onDelete: 'CASCADE',
  })
  children: CategoryEntity[];
}
