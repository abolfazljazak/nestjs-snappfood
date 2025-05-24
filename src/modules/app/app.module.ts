import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(TypeOrmConfig())],
})
export class AppModule {}
