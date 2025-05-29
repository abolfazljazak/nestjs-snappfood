import { InjectRepository } from "@nestjs/typeorm";
import { TypeEntity } from "../entities/type.entity";
import { Repository } from "typeorm";
import { CreateTypeDto } from "../dto/type.dto";
import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class TypeService {
  constructor(
    @InjectRepository(TypeEntity)
    private typeRepository: Repository<TypeEntity>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async create(typeDto: CreateTypeDto) {
    await this.typeRepository.insert({
      title: typeDto.title,
    });

    return {
      message: "created successfuly.",
    };
  }

  async findAll() {
    return await this.typeRepository.find({
      where: {},
      order: { id: "DESC" },
    });
  }

  async findOneById(id: string) {
    const type = await this.typeRepository.findOneBy({ id });
    if (!type) throw new NotFoundException("type not found.");
    return type;
  }

  async remove(id: string) {
    const type = await this.findOneById(id);
    await this.typeRepository.remove(type);
    return {
      message: "deleted successfuly.",
    };
  }
}
