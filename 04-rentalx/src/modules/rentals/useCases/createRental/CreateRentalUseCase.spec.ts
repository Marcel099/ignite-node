import dayjs from "dayjs";

import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let inMemoryRentalsRepository: InMemoryRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const OneDayAfterCurrentDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: OneDayAfterCurrentDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another active for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: OneDayAfterCurrentDate,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "131313",
        expected_return_date: OneDayAfterCurrentDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another active for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: OneDayAfterCurrentDate,
      });

      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "121212",
        expected_return_date: OneDayAfterCurrentDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return date", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
