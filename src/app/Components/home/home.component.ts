import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/Services/call-apis.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private callApis: CallApisService, private toastr : ToastrService, private router:Router) { }
  countdown: string = '';
  userId: any;
  baseUrl = this.callApis.baseUrl;
  isAdding: boolean = false;

  ngOnInit() {
    this.startCountdown();

    this.callApis.getUserId().subscribe({
      next: (response) => {
        console.log(response);
        this.userId = response.userId;
      }
    })


    this.callApis.GetAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response;

      }
    })

    this.callApis.GetAllAdvertise().subscribe({
      next: (response) => {
        console.log(response);
        this.offers = response;

      }
    })



    // this.callApis.GetAllReviews().subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     console.log(response.user);

    //     this.reviews = response;

    //   }
    // })



    this.callApis.GetAllReviews().subscribe({
      next: (response) => {
        console.log(response);

        // 🔥 تصفية التقييمات بحيث نأخذ فقط التقييمات التي قيمتها 4 أو 5
        let filteredReviews = response.filter((review: any) => review.rating >= 4);

        // 🔥 إذا كان هناك أكثر من 5 تقييمات، نختار 5 منها بشكل عشوائي
        if (filteredReviews.length > 5) {
          filteredReviews = this.getRandomReviews(filteredReviews, 5);
        }

        // ✅ تخزين التقييمات النهائية
        this.reviews = filteredReviews;
      },
      error: (err) => {
        console.log("خطأ في جلب التقييمات:", err);
      }
    });




    this.callApis.GetOriginalOffers().subscribe({
      next: (response) => {
        console.log('GetOriginalOffers', response);
        this.originalOffers = response;

        if (this.originalOffers.length > 3) {
          console.log('yes');

          this.updateRandomOffers(); // استدعاء الدالة لاختيار 3 عروض عشوائية
          setInterval(() => {
            this.updateRandomOffers();
          }, 5000); // كل 5 ثوانٍ
        } else {
          this.displayedOffers = [...this.originalOffers]; // لو أقل من 3، نعرضهم كما هم بدون تبديل
        }
      }
    });


    this.callApis.GetVIPOffers().subscribe({
      next: (response) => {
        console.log('GetOriginalOffers', response);
        this.vipOffers = response;

        if (this.vipOffers.length > 3) {
          console.log('yes');

          this.updateRandomOffers(); // استدعاء الدالة لاختيار 3 عروض عشوائية
          setInterval(() => {
            this.updateRandomOffers();
          }, 5000); // كل 5 ثوانٍ
        } else {
          this.displayedVipOffers = [...this.vipOffers]; // لو أقل من 3، نعرضهم كما هم بدون تبديل
        }
      }
    });

  }





  getRandomReviews(reviews: any[], count: number): any[] {
    return reviews.sort(() => 0.5 - Math.random()).slice(0, count);
  }




  getStars(rating: number): number[] {
    return Array.from({ length: Math.round(rating) });
  }


  displayedOffers: any;
  displayedVipOffers: any;
  // // دالة لاختيار 3 عروض عشوائية
  // updateRandomOffers() {
  //   if (this.originalOffers.length > 3) {
  //     const shuffled = [...this.originalOffers].sort(() => 0.5 - Math.random()); // خلط العروض
  //     this.displayedOffers = shuffled.slice(0, 3); // اختيار أول 3 عروض
  //   } else {
  //     this.displayedOffers = [...this.originalOffers]; // لو أقل من 3، نعرضهم كما هم
  //   }
  // }

  updateRandomOffers() {
    const shuffled = [...this.originalOffers].sort(() => 0.5 - Math.random()); // خلط العروض
    this.displayedOffers = shuffled.slice(0, 3); // اختيار أول 3 عروض
    console.log('this.displayedOffers : ', this.displayedOffers);
  }





  startCountdown() {
    let countDownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }



  reviews: any;


  features = [
    { icon: 'fa-solid fa-leaf', title: 'طبيعي 100%', description: 'شاي بدون أي إضافات صناعية.' },
    { icon: 'fa-solid fa-star', title: 'أعلى جودة', description: 'مصنوع من أوراق الشاي الفاخرة.' },
    { icon: 'fa-solid fa-mug-hot', title: 'نكهات متنوعة', description: 'مجموعة واسعة من النكهات لتناسب جميع الأذواق.' }
  ];


  offers: any;

  originalOffers: any;

  weeklyOffers: any;

  vipOffers: any;

  categories: any;

  getPriceAfterDiscount(disc: number, oldPrice: number): number {
    return oldPrice - (oldPrice * (disc / 100));
  }







  addToCart(prodId: number) {

    this.isAdding= true;

    const token = localStorage.getItem('Token');
    if(!token){
      this.router.navigate(['/auth']);
    }


    console.log(prodId);
    const data =
    {
      userId: this.userId,
      productId: prodId,
      quantity: 1
    }

    this.callApis.addToCart(data).subscribe({
      next: (response) => {
        this.isAdding= false;

        console.log(response);
        this.callApis.updateCartCount(this.userId);

        this.toastr.success('تم إضافة المنتج إلي السلة بنجاح!');

      },
      error: (err) =>{
        this.isAdding= false;

      },
    })

  }

}
