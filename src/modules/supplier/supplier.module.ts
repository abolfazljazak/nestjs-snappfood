import { Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { SupplierController } from "./supplier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from "./entities/supplier.entity";
import { SupplierOtpEntity } from "./entities/supplier-otp.entity";
import { CategoryModule } from "../category/category.module";
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from "../category/category.service";
import { CategoryEntity } from "../category/entities/category.entity";
import { S3Service } from "../s3/s3.service";
import { SupplierDocsEntity } from "./entities/supplier-docs.entity";

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([
      SupplierEntity,
      SupplierOtpEntity,
      CategoryEntity,
      SupplierDocsEntity,
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, JwtService, CategoryService, S3Service],
})
export class SupplierModule {}
