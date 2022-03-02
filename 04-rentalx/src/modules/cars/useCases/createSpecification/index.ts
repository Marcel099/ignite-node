import { SpecificationsRepository } from "../../respositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecficationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationRepository = SpecificationsRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);
