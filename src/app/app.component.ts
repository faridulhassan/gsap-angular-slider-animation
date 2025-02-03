import { TestimonialsComponent } from './features/landing-page/component/testimonials/testimonials.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ESimInfoComponent} from './features/landing-page/component/e-sim-info/e-sim-info.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ESimInfoComponent, TestimonialsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'slider-animation';
}
