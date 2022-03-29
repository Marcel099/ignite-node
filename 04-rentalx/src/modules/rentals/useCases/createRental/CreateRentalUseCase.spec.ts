import dayjs from "dayjs";

import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let inMemoryRentalsRepository: InMemoryRentalsRepository;
let inMemoryCarsRepository: InMemoryCarsRepository;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const OneDayAfterCurrentDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      inMemoryCarsRepository,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Test",
      description: "Car test",
      license_plate: "test-1",
      brand: "Test",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "1234",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: OneDayAfterCurrentDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another active for the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: OneDayAfterCurrentDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "131313",
        expected_return_date: OneDayAfterCurrentDate,
      })
    ).rejects.toEqual(new AppError("There's an active rental by this user"));
  });

  it("should not be able to create a new rental if there is another active for the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: OneDayAfterCurrentDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: "121212",
        expected_return_date: OneDayAfterCurrentDate,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return date", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return date"));
  });
});
