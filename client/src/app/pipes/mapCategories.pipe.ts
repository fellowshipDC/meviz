import { Pipe, PipeTransform } from '@angular/core';
import { Museum } from './../models/museum';
@Pipe({
  name: 'categoriesFilter'
})
export class CategoriesFilter implements PipeTransform {
  transform(museums: Museum[], filter: any, filterMuseums: Array<any>, isAnd: Boolean): any {

    if (filter && Array.isArray(museums) && filterMuseums) {
      const filterKeys = Object.keys(filter);

      const checkedMuseums = filterMuseums.filter(event => event.checked);

      if (!checkedMuseums || checkedMuseums.length === 0) { return museums; }
      if (isAnd) {
        return museums.filter(event =>
          filterKeys.reduce((acc1, keyName) =>
            (acc1 && checkedMuseums.reduce((acc2, checkedEvent) => acc2 && new RegExp(event[keyName], 'gi')
              .test(checkedEvent.value) || checkedEvent.value === '', true))
            , true)
        );
      } else {
        return museums.filter(event => {
          return filterKeys.some((keyName) => {
            return checkedMuseums.some((checkedEvent) => {
              return new RegExp(event[keyName], 'gi').test(checkedEvent.value) || checkedEvent.value === '';
            });
          });
        });
      }
    } else {
      return museums;
    }
  }
}
