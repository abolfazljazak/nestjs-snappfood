import { Module } from '@nestjs/common';
import { MenuService } from './services/menu.service';
import { MenuController } from './menu.controller';
import { TypeService } from './services/type.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
