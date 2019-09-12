import { Component, OnInit } from "@angular/core";

import { ContactsService } from "../../core/service/contacts.service";
import { FlashMessagesService } from "ngx-flash-messages";

import { DataService } from "../../core/service/data.service";
import { fadeIn } from "src/app/core/animation/list-animations";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
  animations: [fadeIn]
})
export class ContactListComponent implements OnInit {
  data = [];
  recentData = [];
  serviceData = [];

  constructor(
    private service: ContactsService,
    private dataService: DataService,
    private flashMessage: FlashMessagesService
  ) {
    // get recent contacts
    this.service.getAllRecentContacts().subscribe(
      (response: any) => {
        if (response.data && response.data.length > 0) {
          this.recentData = response.data;
        }
      },
      response => {}
    );

    // check first if we do already have the contacts in the data service
    this.dataService.contactData.subscribe(
      contacts => (this.serviceData = contacts)
    );

    if (this.serviceData.length > 0) {
      // reinitialize the data
      this.data = [];

      // Remove null objects from the contacts
      let filteredArr = this.serviceData.filter(
        x => x.firstName && x.lastName && x.email
      );

      // Call add Divider rows
      let newArr = this.addDividerRows(filteredArr);

      console.log("new array added contact ", newArr.length);
      // Add new array
      this.data = newArr;
    } else {
      // get all contacts
      this.getAllContactsSubscribe();
    }
  }

  // get contacts subscribe function
  getAllContactsSubscribe() {
    this.service.getAllContacts().subscribe(
      (response: any) => {
        if (response.data && response.data.length > 0) {
          let data = response.data;

          // Remove null objects from the contacts and uppercase the first letter
          let filteredArr = data.filter(x => {
            if (x.firstName && x.lastName && x.email) {
              return (
                x.firstName.replace(
                  x.firstName.charAt(0),
                  x.firstName.charAt(0).toUpperCase()
                ) &&
                x.lastName.replace(
                  x.firstName.charAt(0),
                  x.firstName.charAt(0).toUpperCase()
                )
              );
            }
          });
          // share the contacts' data
          this.dataService.setContactData(filteredArr);

          // Call add Divider rows
          let newArr = this.addDividerRows(filteredArr);

          // Show Flash message Success
          this.flashMessage.show("* Contact Loaded Successfully", {
            classes: ["alert", "alert-success"]
          });

          // Add new array
          this.data = newArr;
        }
      },
      err => {
        console.log(err);
        // Show Flash message Success
        this.flashMessage.show("* An Error Occured loading the Contacts", {
          classes: ["alert", "alert-dangeer"]
        });
      }
    );
  }

  // Add Divider Rows
  private addDividerRows(data) {
    // Add the Letters Divider row to the array
    let previous = "";
    let newArr = [];
    data.forEach((contact, index) => {
      if (contact.firstName) {
        if (index == 0) {
          newArr.push({
            letterDivider: contact.firstName.charAt(0).toUpperCase()
          });
          newArr.push(contact);
        } else if (previous !== contact.firstName.charAt(0).toLowerCase()) {
          newArr.push({
            letterDivider: contact.firstName.charAt(0).toUpperCase()
          });
          newArr.push(contact);
        } else {
          newArr.push(data[index]);
        }

        previous = contact.firstName.charAt(0).toLowerCase();
      }
    });

    return newArr;
  }

  ngOnInit() {}
}
