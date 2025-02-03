import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

import { TestimonialCardComponent } from '../../../../testimonial-card/testimonial-card.component';

export interface Testimonial {
  url: string;
  content: string;
  author: string;
  position: string;
}

// Utils
function rotateArray<T>(array: T[], direction: 'left' | 'right'): T[] {
  if (direction === 'right') {
    return [array[array.length - 1], ...array.slice(0, array.length - 1)];
  } else {
    return [...array.slice(1), array[0]];
  }
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  imports: [CommonModule, TestimonialCardComponent],
  standalone: true,
})
export class TestimonialsComponent {
  @ViewChild('testimonialsSliderWrapper', { static: true })
  testimonialsSliderWrapperRef!: ElementRef;

  private assetsUrl = 'assets/images/common/';
  testimonialsLeftData: Testimonial[] = [];
  testimonialsData: Testimonial[] = [
    {
      url: `${this.assetsUrl}Image(1).png`,
      content:
        "For the first time in my life, I didn't have to worry about going through the hassle of getting a new sim card in a different country. everything was in the palm of my hands, and the MyBud app has helped me stay connected with my close ones even when I was miles apart from them.",
      author: 'Kyle Merwin',
      position: 'CEO at APEX',
    },
    {
      url: `${this.assetsUrl}Image(2).png`,
      content:
        "For the first time in my life, I didn't have to worry about going through the hassle of getting a new sim card in a different country. everything was in the palm of my hands, and the MyBud app has helped me stay connected with my close ones even when I was miles apart from them.",
      author: 'Maria Brown',
      position: 'Marketing Manager',
    },
    {
      url: `${this.assetsUrl}Image(3).png`,
      content:
        "For the first time in my life, I didn't have to worry about going through the hassle of getting a new sim card in a different country. everything was in the palm of my hands, and the MyBud app has helped me stay connected with my close ones even when I was miles apart from them.",
      author: 'James Carter',
      position: 'CMO at Wiki',
    },
    {
      url: `${this.assetsUrl}Image(4).png`,
      content:
        "For the first time in my life, I didn't have to worry about going through the hassle of getting a new sim card in a different country. everything was in the palm of my hands, and the MyBud app has helped me stay connected with my close ones even when I was miles apart from them.",
      author: 'Joe Tribiani',
      position: 'Founder at AFRX',
    },
    {
      url: `${this.assetsUrl}Image(5).png`,
      content:
        "For the first time in my life, I didn't have to worry about going through the hassle of getting a new sim card in a different country. everything was in the palm of my hands, and the MyBud app has helped me stay connected with my close ones even when I was miles apart from them.",
      author: 'Ema Brown',
      position: 'Fashion Designer',
    },
  ];
  testimonialsRightData: Testimonial[] = [];
  allSliders: Swiper[] = [];

  activeTestimonial = 0;

  constructor() {
    this.testimonialsLeftData = rotateArray(this.testimonialsData, 'right');
    this.testimonialsRightData = rotateArray(this.testimonialsData, 'left');
  }

  ngAfterViewInit() {
    this.initTestimonialSliders();
  }

  initTestimonialSliders() {
    const testimonialsSliderWrapperEl =
      this.testimonialsSliderWrapperRef.nativeElement;
    const testimonialsSliders: HTMLDivElement[] =
      testimonialsSliderWrapperEl.querySelectorAll('.testimonials-slider');
    testimonialsSliders.forEach((slider, i) => {
      const currentTestiomonialSliderEl = slider.querySelector(
        '.swiper'
      ) as HTMLDivElement;
      const swiperInstance = new Swiper(
        currentTestiomonialSliderEl as HTMLDivElement,
        {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          speed: 2000,
          autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },
          autoHeight: true,
          pagination: {
            el: testimonialsSliderWrapperEl.querySelector(
              '.swiper-pagination'
            ) as HTMLDivElement,
            clickable: true,
          },

          navigation: {
            nextEl: testimonialsSliderWrapperEl.querySelector(
              '.swiper-button-next'
            ) as HTMLDivElement,
            prevEl: testimonialsSliderWrapperEl.querySelector(
              '.swiper-button-prev'
            ) as HTMLDivElement,
          },
          on: {
          },
        }
      );
      this.allSliders.push(swiperInstance);
    });
  }

  destroyTestimonialSliders() {
    this.allSliders.forEach((swiperInstance) => {
      swiperInstance.destroy(true, true);
    });
    this.allSliders = [];
  }
}
