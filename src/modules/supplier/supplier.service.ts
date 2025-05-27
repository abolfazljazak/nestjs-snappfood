import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierEntity } from "./entities/supplier.entity";
import { Repository } from "typeorm";
import { SupplierSignUpDto } from "./dto/supplier.dto";
import { CategoryService } from "../category/category.service";

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
    private categoryService: CategoryService,
  ) {}

  async signUp(signUpDto: SupplierSignUpDto) {
    const {
      categoryId,
      city,
      invite_code,
      manager_family,
      manager_name,
      phone,
      store_name,
    } = signUpDto;

    const supplier = await this.supplierRepository.findOneBy({ phone });
    if (supplier)
      throw new ConflictException("supplier account already exist.");
    const category = await this.categoryService.findOneById(categoryId);
    let agent: SupplierEntity | null = null;
    if (invite_code) {
      agent = await this.supplierRepository.findOneBy({ invite_code });
    }

    const mobileNumber = parseInt(phone);
    const account = this.supplierRepository.create({
      manager_family,
      manager_name,
      phone,
      city,
      store_name,
      agentId: agent?.id,
      categoryId: category.id,
      invite_code: mobileNumber.toString(32).toUpperCase(),
    });
    await this.supplierRepository.save(account);
  }
}
