import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slider } from "./core/animation/route-animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [slider]
})
export class AppComponent {
  title = "contact-list";

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
