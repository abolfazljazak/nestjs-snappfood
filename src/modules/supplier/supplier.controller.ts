import { Body, Controller, Post } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { SupplementaryInformationDto, SupplierSignUpDto } from "./dto/supplier.dto";
import { CheckOtpDto } from "../auth/dto/otp.dto";
import { SupplierAuth } from "src/common/decorators/auth.decorator";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post("signup")
  signUp(@Body() signupDto: SupplierSignUpDto) {
    return this.supplierService.signUp(signupDto);
  }

  @Post("check-otp")
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.supplierService.checkOtp(checkOtpDto);
  }

  @Post("supplementary-information")
  @SupplierAuth()
  supplementaryInformation(@Body() infoDto: SupplementaryInformationDto) {
    return this.supplierService.saveSupplementaryInformation(infoDto)
  }
}
