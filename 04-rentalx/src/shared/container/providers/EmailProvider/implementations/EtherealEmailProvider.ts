import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";

@injectable()
export class EtherealEmailProvider implements IEmailProvider {
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const {
          user,
          pass,
          smtp: { host, port, secure },
        } = account;

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  private client: Transporter;

  async sendEmail(
    to: string,
    subject: string,
    filePath: string,
    variables: any
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(filePath).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "RentalX <noreplay@rentalx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
