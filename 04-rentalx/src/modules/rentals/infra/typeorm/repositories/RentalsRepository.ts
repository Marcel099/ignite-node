import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/rental";

export class RentalsRepository implements IRentalsRepository {
  constructor() {
    this.repository = getRepository(Rental);
  }

  private repository: Repository<Rental>;

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findActiveRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id });
    return rental;
  }

  async findActiveRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id });
    return rental;
  }
}
