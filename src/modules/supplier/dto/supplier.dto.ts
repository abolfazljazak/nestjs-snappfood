import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, MaxLength } from "class-validator";

export class SupplierSignUpDto {
  @ApiProperty()
  @MaxLength(100)
  manager_name: string;

  @ApiProperty()
  @MaxLength(100)
  manager_family: string;

  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: "mobile number is invalid." })
  phone: string;

  @ApiProperty()
  @MaxLength(100)
  store_name: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  invite_code: string;
}
