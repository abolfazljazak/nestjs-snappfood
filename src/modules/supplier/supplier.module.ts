import { Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { SupplierController } from "./supplier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from "./entities/supplier.entity";
import { SupplierOtpEntity } from "./entities/supplier-otp.entity";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([SupplierEntity, SupplierOtpEntity]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
