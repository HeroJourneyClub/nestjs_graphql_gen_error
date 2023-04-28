import { ObjectType } from '@nestjs/graphql';
import { AllowNull, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from 'src/base.model';
import { User } from 'src/user/user.entity';
import { Field } from '@nestjs/graphql';

@Table
@ObjectType()
export class Availability extends BaseModel {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  user: User;

  @AllowNull(false)
  @Column
  day: number;

  @AllowNull(false)
  @Column
  localStartHour: number;

  @AllowNull(false)
  @Column
  localStartMinute: number;

  @AllowNull(false)
  @Column
  localEndHour: number;

  @AllowNull(false)
  @Column
  localEndMinute: number;

  @AllowNull(false)
  @Column
  timezone: string;
}
