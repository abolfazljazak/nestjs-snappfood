import { PartialType } from "@nestjs/swagger";

export class CreateSupplierDto {}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}