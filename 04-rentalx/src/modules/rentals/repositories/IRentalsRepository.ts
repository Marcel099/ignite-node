import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/rental";

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findActiveRentalByCarId(car_id: string): Promise<Rental>;
  findActiveRentalByUserId(user_id: string): Promise<Rental>;
}
