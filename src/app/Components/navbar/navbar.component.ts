import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbar = this.el.nativeElement.querySelector('#navbarSupportedContent');

    if (this.isMenuOpen) {
      this.renderer.addClass(navbar, 'show');
    } else {
      this.renderer.removeClass(navbar, 'show');
    }
  }
}
