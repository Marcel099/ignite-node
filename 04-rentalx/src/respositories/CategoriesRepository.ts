import { Category } from "../model/category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  constructor() {
    this.categories = [];
  }

  private categories: Category[];

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}