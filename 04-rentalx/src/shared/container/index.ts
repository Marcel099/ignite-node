import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository.";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

// eslint-disable-next-line prettier/prettier
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalRepository",
  InMemoryRentalsRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
