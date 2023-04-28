import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TokenResponse } from 'src/token/token.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectModel(User) private UserModel: typeof User,
  ) {}

  @Query(() => User)
  async getUser(
    @Args('userId') userId: string,
  ) {
    return "ok"
  }

  @Query(() => TokenResponse)
  async getToken(
    @Args('userId') userId: string,
  ) {
    return "ok"
  }
}
