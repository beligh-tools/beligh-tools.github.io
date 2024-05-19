import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

}
