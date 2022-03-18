import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatarFile = request.file.filename;

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile });

    return response.send();
  }
}
