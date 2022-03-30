export interface IEmailProvider {
  sendEmail(
    to: string,
    subject: string,
    filePath: string,
    variables: any
  ): Promise<void>;
}
