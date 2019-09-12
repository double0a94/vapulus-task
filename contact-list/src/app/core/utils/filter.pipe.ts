import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchValue): any {
    if (!searchValue) return value;
    return value.filter(v => {
      if (v.firstName && !v.lastName)
        return (
          v.firstName
            .toLowerCase()
            .replace(/\s/g, "")
            .indexOf(searchValue.toLowerCase()) > -1
        );
      else if (v.firstName && v.lastName && searchValue.indexOf(" ") <= -1)
        return (
          v.firstName
            .toLowerCase()
            .replace(/\s/g, "")
            .indexOf(searchValue.toLowerCase()) > -1 ||
          v.lastName
            .toLowerCase()
            .replace(/\s/g, "")
            .indexOf(searchValue.toLowerCase()) > -1
        );
      else if (v.firstName && v.lastName && searchValue.indexOf(" ") > -1) {
        console.log("reached here");
        let str =
          v.firstName.toLowerCase().replace(/\s/g, "") +
          " " +
          v.lastName.toLowerCase().replace(/\s/g, "");
        return str.indexOf(searchValue.toLowerCase()) > -1;
      }
    });
  }
}
