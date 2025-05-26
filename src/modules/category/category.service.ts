import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    image: Express.Multer.File,
  ) {
    const { Location } = await this.s3Service.uploadFile(
      image,
      "snappfood-iamge",
    );
    const { title, slug, parentId } = createCategoryDto;
    const category = await this.findOneBySlug(slug);

    if (category) throw new ConflictException("Category already exists.");

    let parent;
    if (parentId) {
      parent = await this.findOneById(parentId);
    }

    await this.categoryRepository.insert({
      title,
      slug,
      show: true,
      image: Location,
      parentId: parent?.id,
    });

    return {
      message: "Created Category successfully.",
    };
  }

  async findAll() {
    return this.categoryRepository.find({
      where: {},
      relations: {
        parent: true,
      },
      select: {
        parent: {
          title: true,
        },
      }
    });
  }

  async findOneById(id: string) {
    const categoty = await this.categoryRepository.findOneBy({ id });
    if (!categoty) throw new NotFoundException("Category not found.");
    return categoty;
  }
  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({ slug });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
