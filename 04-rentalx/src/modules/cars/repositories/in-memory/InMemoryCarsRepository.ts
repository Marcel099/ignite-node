import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    if (id !== undefined) {
      Object.assign(car, {
        id,
      });

      const carIndex = this.cars.findIndex((car) => car.id === id);

      this.cars[carIndex] = car;
    } else {
      this.cars.push(car);
    }

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available === true)
      .filter((car) => {
        if (!name) {
          return true;
        }
        return car.name === name;
      })
      .filter((car) => {
        if (!brand) {
          return true;
        }
        return car.brand === brand;
      })
      .filter((car) => {
        if (!category_id) {
          return true;
        }
        return car.category_id === category_id;
      });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}
