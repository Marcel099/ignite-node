import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { RentalCarReturnController } from "@modules/rentals/useCases/rentalCarReturn/RentalCarReturnController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalCarReturnController = new RentalCarReturnController();
const listRentalsByUserController = new ListRentalsByUserController();

// eslint-disable-next-line prettier/prettier
rentalsRoutes.post(
  "/",
  ensureAuthenticated,
  createRentalController.handle
);

rentalsRoutes.post(
  "/:id/return",
  ensureAuthenticated,
  rentalCarReturnController.handle
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
