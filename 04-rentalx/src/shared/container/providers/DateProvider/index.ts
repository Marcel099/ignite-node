import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

// eslint-disable-next-line prettier/prettier
container.registerSingleton<IDateProvider>(
  "DateProvider",
  DayjsDateProvider
);
