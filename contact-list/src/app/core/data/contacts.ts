export abstract class ContactsData {
  // Json assets location
  contactsData: string;
  recentContactsData: string;

  constructor() {
    this.contactsData = "assets/contacts.json";
    this.recentContactsData = "assets/recent-contact.json";
  }

  // functions
  abstract getAllContacts();

  abstract addContact(Object);

  abstract getAllRecentContacts();
}
