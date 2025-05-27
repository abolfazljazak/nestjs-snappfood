import { Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { SupplierController } from "./supplier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from "./entities/supplier.entity";
import { SupplierOtpEntity } from "./entities/supplier-otp.entity";
import { CategoryModule } from "../category/category.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([SupplierEntity, SupplierOtpEntity]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, JwtService],
})
export class SupplierModule {}
