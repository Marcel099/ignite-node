import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokensRepository } from "../IUserTokensRepository";

export class InMemoryUserTokensRepository implements IUserTokensRepository {
  userTokens: UserToken[] = [];

  async create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expiration_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(userTokenIndex, 1);
  }
}
