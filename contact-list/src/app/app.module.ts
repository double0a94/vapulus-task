import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FlashMessagesModule } from "ngx-flash-messages";

import { ContactsService } from "./core/service/contacts.service";
import { DataService } from "./core/service/data.service";
import { AlphabetScrollbarComponent } from "./components/alphabet-scrollbar/alphabet-scrollbar.component";
import { FilterPipe } from "./core/utils/filter.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddContactComponent,
    AlphabetScrollbarComponent,
    FilterPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FlashMessagesModule
  ],
  providers: [ContactsService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
