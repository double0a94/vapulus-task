import { Component, OnInit, Input } from "@angular/core";

import { ContactsService } from "../../core/service/contacts.service";
import { FlashMessagesService } from "ngx-flash-messages";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "src/app/core/service/data.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit {
  newCotact;
  contactForm: FormGroup;
  serviceData;

  constructor(
    private service: ContactsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private flashMessage: FlashMessagesService
  ) {
    // check first if we do already have the contacts in the data service and if not get redirected to contact-list page

    this.dataService.contactData.subscribe(
      contacts => (this.serviceData = contacts)
    );

    if (this.serviceData.length == 0) {
      this.router.navigate(["contact-list"]);
    }

    this.contactForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: Number,
      countryCode: Number
    });
  }

  // Creating the form Group
  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(12)
      ]),
      countryCode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4)
      ])
    });
  }

  // Get input fields to be used in validation
  get firstName() {
    return this.contactForm.get("firstName");
  }
  get lastName() {
    return this.contactForm.get("lastName");
  }
  get email() {
    return this.contactForm.get("email");
  }
  get mobileNumber() {
    return this.contactForm.get("mobileNumber");
  }
  get countryCode() {
    return this.contactForm.get("countryCode");
  }

  // Read the image local url
  imageSrc = null;
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }
  formatMobileNumber(value) {
    console.log(value);
  }

  // Add new contact data here
  onSubmit(contactData) {
    // check if fields are not missing
    if (
      contactData.firstName &&
      contactData.lastName &&
      contactData.email &&
      contactData.countryCode &&
      contactData.mobileNumber
    ) {
      // Add image source
      contactData.image = this.imageSrc;

      // First letter capital
      contactData.firstName = contactData.firstName.replace(
        contactData.firstName.charAt(0),
        contactData.firstName.charAt(0).toUpperCase()
      );
      contactData.lastName = contactData.lastName.replace(
        contactData.lastName.charAt(0),
        contactData.lastName.charAt(0).toUpperCase()
      );

      // add mobile number
      contactData.mobileNumber = Number(
        contactData.countryCode.toString() + contactData.mobileNumber.toString()
      );

      // remove country code property
      delete contactData.countryCode;

      this.newCotact = contactData;

      // Add the Contact to the Data service
      this.service.addContact(contactData);

      // Reset the form
      this.contactForm.reset();

      // Show Flash Message
      this.flashMessage.show("* Contact Added Successfully", {
        classes: ["alert", "alert-success"]
      });

      // Navigate to the contacts list page
      this.router.navigate(["contact-list"]);
    } else {
      this.flashMessage.show("* Please make sure to fill up all the fields", {
        classes: ["alert", "alert-danger"]
      });
    }
  }
}
