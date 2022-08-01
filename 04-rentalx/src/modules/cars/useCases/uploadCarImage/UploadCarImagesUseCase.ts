import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/Storage/IStorageProvider";

interface IRequest {
  car_id: string;
  carImageFiles: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, carImageFiles }: IRequest): Promise<void> {
    carImageFiles.forEach(async (carImageFile) => {
      await this.storageProvider.save(carImageFile, "cars");

      await this.carImagesRepository.create(car_id, carImageFile);
    });
  }
}
