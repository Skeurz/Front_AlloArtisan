import { Component } from '@angular/core';
import { HostListener, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  isExpanded = false;

  constructor(private elementRef: ElementRef) {}

 /* @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkFooterVisibility();
  }

  checkFooterVisibility() {
    const footerElement = this.elementRef.nativeElement;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    const scrollPosition = window.pageYOffset;

    const footerVisibleHeight = bodyHeight - scrollPosition - windowHeight;
    const footerContentHeight = footerElement.offsetHeight;

    if (footerVisibleHeight <= footerContentHeight) {
      this.expandFooter();
    } else {
      this.collapseFooter();
    }
  }*/

  expandFooter() {
    this.isExpanded = true;
  }

  collapseFooter() {
    this.isExpanded = false;
  }
}
