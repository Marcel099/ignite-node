import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCaseUseCase } from "./GetUserUseCaseUseCase";

export class GetUserUseCaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const getUserUseCaseUseCase = container.resolve(GetUserUseCaseUseCase);

    const user = await getUserUseCaseUseCase.execute(id);

    return response.json(user);
  }
}
