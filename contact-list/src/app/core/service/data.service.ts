import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// Used For sharing, sorting and adding new contacts between components
@Injectable()
export class DataService {
  contactDataSource: BehaviorSubject<Array<Object>> = new BehaviorSubject([]);

  contactData = this.contactDataSource.asObservable();

  // Sort the contacts alphaptically according to first name and last name (if exists)
  // we should ignore the "-" from the strings and compare with out them
  compare(a, b) {
    if (a.firstName != null && a.lastName == null) {
      if (
        a.firstName.toLowerCase().replace("-", "") <
        b.firstName.toLowerCase().replace("-", "")
      ) {
        return -1;
      }
      if (
        a.firstName.toLowerCase().replace("-", "") >
        b.firstName.toLowerCase().replace("-", "")
      ) {
        return 1;
      }
      return 0;
    } else if (a.firstName != null && a.lastName != null) {
      if (
        a.firstName.toLowerCase().replace("-", "") +
          a.lastName.toLowerCase().replace("-", "") <
        b.firstName.toLowerCase().replace("-", "") +
          b.lastName.toLowerCase().replace("-", "")
      ) {
        return -1;
      }
      if (
        a.firstName.toLowerCase().replace("-", "") +
          a.lastName.toLowerCase().replace("-", "") >
        b.firstName.toLowerCase().replace("-", "") +
          b.lastName.toLowerCase().replace("-", "")
      ) {
        return 1;
      }
      return 0;
    }
    return 0;
  }

  setContactData(data) {
    this.contactDataSource.next(data);
  }

  addNewContactData(contactData) {
    const currentValue = this.contactDataSource.value;
    currentValue.push(contactData);
    const newContactData = currentValue.sort(this.compare);
    return this.contactDataSource.next(newContactData);
  }
}
