import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalCarReturnUseCase } from "./RentalCarReturnUseCase";

export class RentalCarReturnController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const rentalCarReturnUseCase = container.resolve(RentalCarReturnUseCase);

    const rental = await rentalCarReturnUseCase.execute({ id, user_id });

    return response.status(200).json(rental);
  }
}
