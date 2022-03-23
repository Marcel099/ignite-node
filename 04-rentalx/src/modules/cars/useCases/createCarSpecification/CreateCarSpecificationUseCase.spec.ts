import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it("should be able to add a new specification to the car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to add a new specification to a car that doesn't exist", async () => {
    const { id: car_id } = await inMemoryCarsRepository.create({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await inMemorySpecificationsRepository.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(specificationsCars.id).toBe(car_id);
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
