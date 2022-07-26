import { Router } from "express";
import { ensureAuthenticatedClient } from "./middlewares/ensureAuthenticatedClient";
import { ensureAuthenticatedDeliveryman } from "./middlewares/ensureAuthenticatedDeliveryman";

import { AuthenticateClientController } from "./modules/accounts/useCases/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/useCases/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { FindAllClientDeliveriesController } from "./modules/clients/useCases/findAllClientDeliveries/FindAllClientDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/createDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/findAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/createDeliverymanController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliverymanDeliveries/FindAllDeliverymanDeliveriesController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();
const findAllClientDeliveriesController = new FindAllClientDeliveriesController();
const findAllDeliverymanDeliveriesController = new FindAllDeliverymanDeliveriesController();

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticatedClient, createDeliveryController.handle);

routes.get("/delivery/available", ensureAuthenticatedDeliveryman, findAllAvailableController.handle);
routes.patch("/delivery/:id/updateDeliveryman", ensureAuthenticatedDeliveryman, updateDeliverymanController.handle);
routes.patch("/delivery/:id/updateEndDate", ensureAuthenticatedDeliveryman, updateEndDateController.handle);

routes.get("/client/deliveries", ensureAuthenticatedClient, findAllClientDeliveriesController.handle);
routes.get("/deliveryman/deliveries", ensureAuthenticatedDeliveryman, findAllDeliverymanDeliveriesController.handle);

export { routes };
