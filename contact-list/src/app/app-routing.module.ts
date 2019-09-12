import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

const routes: Routes = [
  {
    path: "contact-list",
    component: ContactListComponent,
    data: { animation: "toLeft" }
  },
  {
    path: "add-contact",
    component: AddContactComponent,
    data: { animation: "toRight" }
  },
  { path: "", redirectTo: "contact-list", pathMatch: "full" }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
