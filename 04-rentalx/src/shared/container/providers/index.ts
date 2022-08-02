import "reflect-metadata";
import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealEmailProvider } from "./EmailProvider/implementations/EtherealEmailProvider";
import { LocalStorageProvider } from "./Storage/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./Storage/implementations/S3StorageProvider";
import { IStorageProvider } from "./Storage/IStorageProvider";

// eslint-disable-next-line prettier/prettier
container.registerSingleton<IDateProvider>(
  "DateProvider",
  DayjsDateProvider
);

container.registerInstance<IEmailProvider>(
  "EmailProvider",
  new EtherealEmailProvider()
);

const DiskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorage[process.env.DISK]
);
