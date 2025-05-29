import { Body, Controller, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import {
  SupplementaryInformationDto,
  SupplierSignUpDto,
  UploadDocsDto,
} from "./dto/supplier.dto";
import { CheckOtpDto } from "../auth/dto/otp.dto";
import { SupplierAuth } from "src/common/decorators/auth.decorator";
import { UploadFileFieldsS3 } from "src/common/interceptors/upload-file.interceptor";
import { SwaggerConsumes } from "src/common/enum/swagger-consumes.enum";
import { ApiConsumes } from "@nestjs/swagger";

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
    return this.supplierService.saveSupplementaryInformation(infoDto);
  }

  @Put("upload-documents")
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @SupplierAuth()
  @UseInterceptors(
    UploadFileFieldsS3([
      { name: "acceptedDoc", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
  )
  uploadDocuments(@Body() infoDto: UploadDocsDto, @UploadedFiles() files: any) {
    return this.supplierService.uploadDocuments(files);
  }
}
