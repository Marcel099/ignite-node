import { container } from "tsyringe";

import { IEmailProvider } from "./IEmailProvider";
import { EtherealEmailProvider } from "./implementations/EtherealEmailProvider";
import { SESEmailProvider } from "./implementations/SESMailProvider";

const EmailProvider = {
  etherial: container.resolve(EtherealEmailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IEmailProvider>(
  "EmailProvider",
  EmailProvider[process.env.EMAIL_PROVIDER]
);
