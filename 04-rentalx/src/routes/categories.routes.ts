import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoryController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", async (request, response) => {
  const result = await createCategoryController().handle(request, response);
  return result;
});

categoriesRoutes.get("/", (request, response) => {
  const result = listCategoryController().handle(request, response);
  return result;
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const result = importCategoryController().handle(request, response);
  return result;
});

export { categoriesRoutes };
