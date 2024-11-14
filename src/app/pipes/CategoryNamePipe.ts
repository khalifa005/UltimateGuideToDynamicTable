import { Pipe, PipeTransform } from "@angular/core";
import { categoryLookup } from "../FakeApiData/ApiCategoryLookup";

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {
  transform(categoryId: number): string {
    const category = categoryLookup.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }
}
