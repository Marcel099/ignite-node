import { CategoriesRepository } from "../../respositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRespository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRespository);

export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);
