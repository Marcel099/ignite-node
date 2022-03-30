import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgottenPasswordEmailController } from "@modules/accounts/useCases/sendForgottenPasswordEmail/SendForgottenPasswordEmailController";

const passwordRoutes = Router();

const sendForgottenPasswordEmailController =
  new SendForgottenPasswordEmailController();

const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgottenPasswordEmailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
