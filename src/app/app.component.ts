import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 't4tea';

  isAuthPage = false;

  constructor(private router: Router) {
    // مراقبة التغيير في المسار (الـ routes)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // التحقق إذا كنا في صفحة "auth"
        this.isAuthPage = event.url.includes('auth'); // تغيير 'auth' إذا كان المسار مختلفًا
      }
    });
  }

  ngOnInit(): void {}
  

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet?.activatedRouteData?.['animation']; // ✅ يحدد الأنيميشن بناءً على الصفحة الحالية
  // }
}
