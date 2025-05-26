import { ConflictException, Injectable } from "@nestjs/common";
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
    const { title, slug, parentId, show } = createCategoryDto;
    const category = await this.findOneBySlug(slug);
    if (!category) throw new ConflictException("Category already exists.");
    await this.categoryRepository.insert({
      title,
      slug,
      show: true,
      image: Location,
    });

    return {
      message: "Created Category successfully."
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
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
