import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ContactsData } from "../data/contacts";

// Helper package used to save file locally (should be used only during development not a good practice in real world!)
import { saveAs } from "file-saver";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class ContactsService extends ContactsData {
  /**
   * This service is responsible for all CRUD requests
   */

  newcontactsArr;

  constructor(public http: HttpClient, private dataService: DataService) {
    super();
  }
  //  Get all Contacts
  getAllContacts() {
    return this.http.get(`assets/contacts.json`);
  }

  getAllRecentContacts() {
    return this.http.get(`assets/recent-contact.json`);
  }

  // Add a new Contact
  addContact(newContact: Object) {
    // Get the json data and add the new Contact in alphaptic order
    this.dataService.addNewContactData(newContact);

    // subscripe to contacts data
    this.dataService.contactData.subscribe(
      contacts => (this.newcontactsArr = contacts)
    );
    console.log(this.newcontactsArr.length);
    //saveAs(this.newcontactsArr, "assets/contacts.json");
  }
}
