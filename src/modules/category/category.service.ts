import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { DeepPartial, Repository } from "typeorm";
import { S3Service } from "../s3/s3.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import {
  paginationGenerator,
  paginationSolver,
} from "src/common/utils/pagination.util";
import { isBoolean } from "class-validator";

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
    const { Location, Key } = await this.s3Service.uploadFile(
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
      imageKey: Key,
    });

    return {
      message: "Created Category successfully.",
    };
  }

  async findAll(pagination: PaginationDto) {
    const { limit, page, skip } = paginationSolver(pagination);
    const [categories, count] = await this.categoryRepository.findAndCount({
      where: {},
      relations: {
        parent: true,
      },
      select: {
        parent: {
          title: true,
        },
      },
      skip,
      take: limit,
      order: {
        id: "DESC",
      },
    });

    return {
      pagination: paginationGenerator(count, page, limit),
      categories,
    };
  }

  async findOneById(id: string) {
    const categoty = await this.categoryRepository.findOneBy({ id });
    if (!categoty) throw new NotFoundException("Category not found.");
    return categoty;
  }
  async findOneBySlug(slug: string) {
    return this.categoryRepository.findOneBy({ slug });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    image: Express.Multer.File,
  ) {
    const { parentId, show, slug, title } = updateCategoryDto;
    const category = await this.findOneById(id);

    const updateObject: DeepPartial<CategoryEntity> = {};

    if (image) {
      const { Location, Key } = await this.s3Service.uploadFile(
        image,
        "snappfood",
      );
      if (Location) {
        updateObject["image"] = Location;
        updateObject["imageKey"] = Key;

        if (category.imageKey)
          await this.s3Service.deleteFile(category?.imageKey);
      }
    }

    if (title) updateObject["title"] = title;
    if (show && isBoolean(show)) updateObject["show"] = show;
    if (slug) updateObject["slug"] = slug;

    if (parentId) {
      const category = await this.findOneById(parentId);
      updateObject["parentId"] = category.id;
    }

    if (slug) {
      const category = await this.findOneBySlug(slug);
      if (category)
        throw new ConflictException("Slug Category already exists.");
    }

    await this.categoryRepository.update({ id }, updateObject);

    return {
      message: "updated successfully.",
    };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
