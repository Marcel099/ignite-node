import { Category } from "../model/category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  list(): Category[];
  findByName(name: string): Category;
  create({ name, description }: ICreateCategoryDTO): void;
}
