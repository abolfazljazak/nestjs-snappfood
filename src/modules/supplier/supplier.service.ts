import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierEntity } from "./entities/supplier.entity";
import { Repository } from "typeorm";
import {
  SupplementaryInformationDto,
  SupplierSignUpDto,
} from "./dto/supplier.dto";
import { CategoryService } from "../category/category.service";
import { randomInt } from "crypto";
import { SupplierOtpEntity } from "./entities/supplier-otp.entity";
import { CheckOtpDto } from "../auth/dto/otp.dto";
import { TokensPayload } from "../auth/types/payload";
import { JwtService } from "@nestjs/jwt";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupplierStatus } from "./enum/status.enum";

@Injectable({ scope: Scope.REQUEST })
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(SupplierOtpEntity)
    private supplierOtpRepository: Repository<SupplierOtpEntity>,
    private categoryService: CategoryService,
    private jwtService: JwtService,
    @Inject(REQUEST) private request: Request,
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
    await this.createOtpForSupplier(account);
  }

  async createOtpForSupplier(supplier: SupplierEntity) {
    const expriesIn = new Date(new Date().getTime() + 1000 * 60 * 2);
    const code = randomInt(10000, 99999).toString();
    let otp = await this.supplierOtpRepository.findOneBy({
      supplierId: supplier.id,
    });
    if (otp) {
      if (otp.expries_in > new Date()) {
        throw new BadRequestException("otp code not expried!.");
      }
      (otp.code = code), (otp.expries_in = expriesIn);
    } else {
      otp = this.supplierOtpRepository.create({
        code: code,
        expries_in: expriesIn,
        supplierId: supplier.id,
      });
    }
    otp = await this.supplierOtpRepository.save(otp);
    supplier.otpId = otp.id;
    await this.supplierOtpRepository.save(supplier);
  }

  async makeTokens(payload: TokensPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "30d",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "1y",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const { mobile, code } = checkOtpDto;
    const now = new Date();
    const supplier = await this.supplierRepository.findOne({
      where: { phone: mobile },
      relations: {
        otp: true,
      },
    });
    if (!supplier || !supplier?.otp)
      throw new UnauthorizedException("User Not Found.");

    const otp = supplier.otp;
    if (otp?.code !== code)
      throw new UnauthorizedException("otp code is incorrect.");

    if (otp.expries_in < now)
      throw new UnauthorizedException("otp code is expried.");

    if (!supplier.mobile_verify) {
      await this.supplierRepository.update(
        {
          id: supplier.id,
        },
        {
          mobile_verify: true,
        },
      );
    }
    const { accessToken, refreshToken } = await this.makeTokens({
      id: supplier.id,
    });
    return {
      accessToken,
      refreshToken,
      message: "you logged-in successfully.",
    };
  }

  async validateAccessToken(token: string) {
    try {
      const payload = this.jwtService.verify<TokensPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      if (typeof payload === "object" && payload?.id) {
        const supplier = await this.supplierRepository.findOneBy({
          id: payload.id,
        });
        if (!supplier) {
          throw new UnauthorizedException("login on your account.");
        }
        return supplier;
      }
      throw new UnauthorizedException("login on your account.");
    } catch (error) {
      throw new UnauthorizedException("login on your account.");
    }
  }

  async saveSupplementaryInformation(infoDto: SupplementaryInformationDto) {
    const { id } = this.request.user;
    const { email, national_code } = infoDto;
    let supplier = await this.supplierRepository.findOneBy({ national_code });

    if (supplier && supplier.id !== id) {
      throw new ConflictException("national code already used.");
    }

    supplier = await this.supplierRepository.findOneBy({ email });
    if (supplier && supplier.id !== id) {
      throw new ConflictException("email already used.");
    }

    await this.supplierRepository.update(
      { id },
      {
        email,
        national_code,
        status: SupplierStatus.SupplementaryInformation,
      },
    );
  }
}
