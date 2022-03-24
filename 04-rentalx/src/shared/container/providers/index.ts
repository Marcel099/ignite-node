import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

// eslint-disable-next-line prettier/prettier
container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
