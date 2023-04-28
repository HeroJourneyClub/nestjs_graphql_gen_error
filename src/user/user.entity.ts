import { HideField, ObjectType } from '@nestjs/graphql';
import { AllowNull, Column, Table, ForeignKey, BelongsTo, Unique, HasMany } from 'sequelize-typescript';
import { BaseModel } from 'src/base.model';
import { Availability } from 'src/availability/availability.entity';

export enum UserRole {
  PUBLIC = 'public',
  USER = 'user',
  ADMIN = 'admin',
  JOURNEY_GUIDE = 'journeyGuide',
  MENTAL_HEALTH_ADVOCATE = 'mentalHealthAdvocate',
  DEV_TROOPER = 'devTrooper',
  COMMUNITY_MANAGER = 'communityManager',
}

@Table
@ObjectType()
export class User extends BaseModel {
  @HideField()
  @AllowNull(false)
  @Column({ defaultValue: UserRole.USER })
  role: UserRole;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Unique
  @Column
  email?: string;

  @HideField()
  @HasMany(() => Availability)
  availability: Availability[];

  // @Column
  // email2?: string;
}
