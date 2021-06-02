import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, ...args: any[]): any {
    const [value] = args;
    if (!value) return items;
    console.log(items, value);
    const filteredItems = items.filter((item) => {
      console.log(item.product_id.type, item.product_id.title);
      return (
        item.product_id.type.toString().includes(value) ||
        item.product_id.title.toString().includes(value)
      );
    });
    console.log(filteredItems);
    return filteredItems;
  }
}
