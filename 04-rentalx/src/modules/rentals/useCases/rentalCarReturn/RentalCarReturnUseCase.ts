import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class RentalCarReturnUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exist");
    }

    const minimunDuration = 1;

    const currentDate = this.dateProvider.getCurrentDate();
    let numberOfDailiesInDays = this.dateProvider.compareDatesInDays(
      rental.start_date,
      currentDate
    );

    if (numberOfDailiesInDays <= 0) {
      numberOfDailiesInDays = minimunDuration;
    }

    const rentalReturnDelayInDays = this.dateProvider.compareDatesInDays(
      currentDate,
      rental.expected_return_date
    );

    let total = 0;

    if (rentalReturnDelayInDays > 0) {
      const calculatedFine = rentalReturnDelayInDays * car.fine_amount;
      total = calculatedFine;
    }

    total += numberOfDailiesInDays * car.daily_rate;

    rental.end_date = this.dateProvider.getCurrentDate();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
