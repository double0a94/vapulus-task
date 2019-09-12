import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-alphabet-scrollbar",
  templateUrl: "./alphabet-scrollbar.component.html",
  styleUrls: ["./alphabet-scrollbar.component.scss"]
})
export class AlphabetScrollbarComponent implements OnInit {
  constructor() {}

  scrollBarData = [];

  @Input()
  set alphabetScrollbarInit(contacts) {
    this.scrollBarData = [
      ...new Set(
        contacts.map(contact => {
          if (contact.firstName)
            return contact.firstName.charAt(0).toUpperCase();
          else if (contact.email) return contact.email.charAt(0).toUpperCase();
        })
      )
    ];
  }

  // Scroll using javascript
  // and animate scrolling using css
  scrollTo(el: string) {
    let element = document.getElementById(el);
    element.scrollIntoView();
  }
  ngOnInit() {}
}
