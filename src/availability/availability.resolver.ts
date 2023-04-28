import { Args, Field, InputType, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { Availability } from './availability.entity';
import { InjectModel } from '@nestjs/sequelize';

@InputType()
export class AvailabilityInput {
  @Field()
  day: number;

  @Field()
  localStartHour: number;

  @Field()
  localStartMinute: number;

  @Field()
  localEndHour: number;

  @Field()
  localEndMinute: number;

  @Field()
  timezone: string;
}

@Resolver(() => Availability)
export class AvailabilityResolver {
  constructor(
    @InjectModel(Availability) private availabilityModel: typeof Availability,
  ) {}

  @Mutation(() => [Availability])
  async replaceAvailability(
    @Args('userId') userId: string,
    @Args({ name: 'availabilities', type: () => [AvailabilityInput] }) availabilities: Array<AvailabilityInput>,
  ) {
    return "ok"
  }
}
