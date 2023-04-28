import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';

const models = [SequelizeModule.forFeature([User])];

@Module({
  imports: [...models],
  providers: [UserResolver],
  exports: [...models],
})
export class UserModule {}
