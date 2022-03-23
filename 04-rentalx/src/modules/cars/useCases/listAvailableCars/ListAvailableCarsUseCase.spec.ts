import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let inMemoryCarsRepository: InMemoryCarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car 1",
      description: "Car Description",
      license_plate: "ABC-1234",
      brand: "Car brand",
      daily_rate: 140,
      fine_amount: 100,
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car 1",
      description: "Car Description",
      license_plate: "ABC-1234",
      brand: "Car brand",
      daily_rate: 140,
      fine_amount: 100,
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car 1",
      description: "Car Description",
      license_plate: "ABC-1234",
      brand: "Car brand",
      daily_rate: 140,
      fine_amount: 100,
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car 1",
      description: "Car Description",
      license_plate: "ABC-1234",
      brand: "Car brand",
      daily_rate: 140,
      fine_amount: 100,
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
