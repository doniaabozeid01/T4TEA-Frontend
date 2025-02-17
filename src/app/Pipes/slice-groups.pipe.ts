import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceGroups'
})
export class SliceGroupsPipe implements PipeTransform {

  transform(array: any[], groupSize: number): any[][] {
    return array.reduce((acc, item, index) => {
      if (index % groupSize === 0) acc.push([]);
      acc[acc.length - 1].push(item);
      return acc;
    }, []);
  }

}
