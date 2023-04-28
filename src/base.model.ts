import { ObjectType } from '@nestjs/graphql';
import { IsUUID, PrimaryKey, Column, Model, AllowNull } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends Model {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ defaultValue: Sequelize.fn('gen_random_uuid') })
  id: string;

  @AllowNull(false)
  @Column({ defaultValue: Sequelize.fn('NOW') })
  createdAt: Date;

  @AllowNull(false)
  @Column({ defaultValue: Sequelize.fn('NOW') })
  updatedAt: Date;
}
