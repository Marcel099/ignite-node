import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import path from "path";

import uploadConfig from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  private client: S3;

  async save(file: string, folder: string): Promise<string> {
    const originalName = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);
    const ContentType = mime.getType(originalName);

    console.log("should make the upload");

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        // ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
