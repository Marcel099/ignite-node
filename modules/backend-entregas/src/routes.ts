import { Router } from "express";

import { AuthenticateClientController } from "./modules/accounts/useCases/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/useCases/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/createDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

export { routes };
