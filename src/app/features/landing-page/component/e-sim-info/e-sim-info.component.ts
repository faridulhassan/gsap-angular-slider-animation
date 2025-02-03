import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-e-sim-info',
  templateUrl: './e-sim-info.component.html',
  styleUrls: ['./e-sim-info.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ESimInfoComponent implements OnInit, OnDestroy {
  animateImages: HTMLDivElement[] = [];
  howItWorksBoxes: HTMLDivElement[] = [];
  currentIndex: number = 0; 
  private animationIntervalTime: number = 2000;
  private animationDuration: number = 1;
  private timeline: gsap.core.Timeline | null = null;
  private mm = gsap.matchMedia();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const rootEl = this.elementRef.nativeElement;
    this.howItWorksBoxes = Array.from(rootEl.querySelectorAll('.how-it-works-box'));
    this.animateImages = Array.from(rootEl.querySelectorAll('.animate-imgs'));

    this.howItWorksBoxes.forEach((box, index) => {
      gsap.to(box, { opacity: index === this.currentIndex ? 1 : 0.6 });
      gsap.to(this.animateImages[index], { opacity: index === this.currentIndex ? 1 : 0 });

      this.mm.add('(min-width: 768px)', () => {
        gsap.to(box.querySelector('.arrow-icon>svg'), { rotate: index === this.currentIndex ? 0 : -90 });
        gsap.to(box.querySelector('.box-content'), {
          height: index === this.currentIndex ? 'auto' : 0,
        });
      });
    });

    this.createTimeline();
  }

  createTimeline() {
    this.timeline = gsap.timeline({ repeat: -1 });

    this.howItWorksBoxes.forEach((_, index) => {
      this.timeline?.add(this.animateBox(index), `+=${this.animationIntervalTime / 1000}`);
    });
  }

  animateBox(index: number) {
    const currentBox = this.howItWorksBoxes[index];
    const nextIndex = (index + 1) % this.howItWorksBoxes.length;
    const nextBox = this.howItWorksBoxes[nextIndex];

    const currentImage = this.animateImages[index];
    const nextImage = this.animateImages[nextIndex];

    return gsap.timeline()
      .to([currentBox], { opacity: 0.6, duration: this.animationDuration }, 0)
      .to([currentImage], { opacity: 0, duration: this.animationDuration }, 0)
      .add(() => {
        this.updateIndex(nextIndex);
        this.toggleBoxAnimation(currentBox, nextBox);
      }, 0)
      .to([nextBox, nextImage], { opacity: 1, duration: this.animationDuration }, 0);
  }

  toggleBoxAnimation(currentBox: HTMLElement, nextBox: HTMLElement) {
    this.mm.add('(min-width: 768px)', () => {
      gsap.to(currentBox.querySelector('.arrow-icon>svg'), {
        rotate: -90,
        duration: 0.5,
      });
      gsap.to(currentBox.querySelector('.box-content'), {
        height: 0,
        duration: this.animationDuration,
      });

      gsap.to(nextBox.querySelector('.arrow-icon>svg'), {
        rotate: 0,
        duration: 0.5,
      });
      gsap.to(nextBox.querySelector('.box-content'), {
        height: 'auto',
        duration: this.animationDuration,
      });
    });

    this.mm.add('(max-width: 767px)', () => {
      gsap.to(currentBox, { opacity: 0, duration: this.animationDuration });
    });
  }

  updateIndex(newIndex: number) {
    this.currentIndex = newIndex;
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
      this.mm.kill();
    }
  }
}
