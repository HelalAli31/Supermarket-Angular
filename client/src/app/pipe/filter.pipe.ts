import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, ...args: any[]): any {
    const [key, value] = args;
    if (!value) return items;
    const filteredProducts = items.filter((item) => {
      let filterBy = key == '_id' ? item['category']._id : item[key];
      return filterBy.toString().includes(value);
    });
    return filteredProducts;
  }
}
