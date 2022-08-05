import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";

@injectable()
export class SESEmailProvider implements IEmailProvider {
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
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
      from: "RentalX <marcelo.lupatini@gmail.com.br>",
      subject,
      html: templateHTML,
    });
  }
}
