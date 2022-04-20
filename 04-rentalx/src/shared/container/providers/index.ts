import "reflect-metadata";
import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealEmailProvider } from "./EmailProvider/implementations/EtherealEmailProvider";

// eslint-disable-next-line prettier/prettier
container.registerSingleton<IDateProvider>(
  "DateProvider",
  DayjsDateProvider
);

container.registerInstance<IEmailProvider>(
  "EmailProvider",
  new EtherealEmailProvider()
);
