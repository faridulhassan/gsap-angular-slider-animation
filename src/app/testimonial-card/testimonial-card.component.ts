import { Component, Input } from '@angular/core';
import { Testimonial } from './../features/landing-page/component/testimonials/testimonials.component';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent {
  @Input() testimonial!: Testimonial;
}
