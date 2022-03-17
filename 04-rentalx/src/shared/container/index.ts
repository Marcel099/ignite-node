import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/respositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/respositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/respositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/respositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
