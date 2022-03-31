import { IEmailProvider } from "../IEmailProvider";

export class InMemoryEmailProvider implements IEmailProvider {
  private message: any[] = [];

  async sendEmail(
    to: string,
    subject: string,
    filePath: string,
    variables: any
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      filePath,
      variables,
    });
  }
}
