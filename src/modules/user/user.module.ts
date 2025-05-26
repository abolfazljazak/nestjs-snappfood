import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserAddressEntity } from "./entities/address.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserAddressEntity])
    ]
})
export class UserModule {}