import { Category } from "../model/category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class PostgresCategoriesRepository implements ICategoriesRepository {
  list(): Category[] {
    return null;
  }

  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}
