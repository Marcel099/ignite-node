import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { RentalCarReturnController } from "@modules/rentals/useCases/rentalCarReturn/RentalCarReturnController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalCarReturnController = new RentalCarReturnController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  "/:id/return",
  ensureAuthenticated,
  rentalCarReturnController.handle
);

export { rentalsRoutes };
