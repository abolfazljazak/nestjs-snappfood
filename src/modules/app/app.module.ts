import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    CategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
