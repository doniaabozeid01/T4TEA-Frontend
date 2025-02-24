import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private callApi: CallApisService, private cdRef: ChangeDetectorRef) { }

  userName: any;





  /////////////////////////////////////////////////////////// 

  wishlistCount: number = 0;
  cartCount: number = 0;
  userId: any;


  updateLoginStatus() {
    this.logind = localStorage.getItem('Token') !== null;
  }


  ngOnInit(): void {
    this.updateLoginStatus();

    ///////////////////////////////////////////// 
    this.callApi.getUserId().subscribe({
      next: (data) => {
        this.userId = data.userId.toString();
        this.callApi.updateWishlistCount(this.userId);
        this.callApi.updateCartCount(this.userId);
      },
      error: () => {
        console.error("فشل في جلب معرف المستخدم");
      }
    });

    this.callApi.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    this.callApi.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    //////////////////////////////////////////////////////

    this.logind = localStorage.getItem('Token') !== null;

    this.callApi.getUserName().subscribe({
      next: (response) => {
        console.log("API Response:", response); // شوفي شكل الداتا هنا
        this.userName = response.fullName;
      },
      error: (err) => {
        console.error("Error fetching user name:", err);
      }
    });
    
  }


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



  showMenu = false;
  logind!: boolean;

  signOut() {
    console.log("تسجيل الخروج...");
  
    localStorage.removeItem('Token');
    this.userName = '';
    this.updateLoginStatus(); // تحديث الحالة
  
    // this.router.navigate(['/auth']);
  }
  


  signIn() {
    // localStorage.removeItem('Token');
    this.router.navigate(['/auth']);
    this.logind = true;
  }


}
