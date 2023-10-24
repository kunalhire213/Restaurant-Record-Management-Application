import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: string): any[] {

    if (!value || !args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter((item: any) => {
      return item.name.toLowerCase().includes(args) || item.address.toLowerCase().includes(args);
    })
  }

}
