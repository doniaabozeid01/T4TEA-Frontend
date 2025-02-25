import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  constructor(private router: Router, private callApi: CallApisService, private route: ActivatedRoute, private toastr: ToastrService) { }

  product: any;
  userId: any;
  favouritesList: any[] = []; // مصفوفة تحتوي على المنتجات المفضلة

  recommendedProducts: any;

  baseUrl: string = "https://localhost:7095"; // تأكد من وضع الـ API URL هنا
  productId: any;
  products: any;
  fullStars: number[] = [];
  emptyStars: number[] = [];

  ngOnInit() {

    this.callApi.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.recommendedProducts = this.getRandomProducts(response, 3);
        console.log(response);

      }
    })




    this.callApi.getUserId().subscribe({
      next: (response) => {
        this.userId = response.userId;
        this.loadFavourites();

      }
    })
    // this.productId = this.route.snapshot.paramMap.get('id');


    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');

      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });



    if (this.productId) {
      this.callApi.getProductById(+this.productId).subscribe({
        next: (response) => {
          console.log("✅ Product Data:", response);
          this.product = response;
          let rating = response.rate ?? 0; // إذا كان null أو undefined، اجعله 0
          let roundedRate = Math.round(rating);
          this.fullStars = Array(roundedRate).fill(0);
          this.emptyStars = Array(5 - roundedRate).fill(0);
        },
        error: (error) => {
          console.error("🚨 API Error:", error);
        }
      });
    }
  }


  loadProductDetails(productId: number) {
    this.callApi.getProductById(+productId).subscribe({
      next: (response) => {
        console.log("✅ Product Data:", response);
        this.product = response;
        let rating = response.rate ?? 0;
        let roundedRate = Math.round(rating);
        this.fullStars = Array(roundedRate).fill(0);
        this.emptyStars = Array(5 - roundedRate).fill(0);
      },
      error: (error) => {
        console.error("🚨 API Error:", error);
      }
    });

    this.recommendedProducts = this.getRandomProducts(this.products, 3);

  }



  getRandomProducts(products: any[], count: number): any[] {
    let shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


  goToDetails(productId: number) {
    console.log("hiiiiiiii");
    console.log(productId);

    this.router.navigate(['/product-details', productId]);
  }


  AddToCart(prodId: number) {
    // event.stopPropagation(); // منع الانتقال إلى صفحة التفاصيل عند النقر على "اضف الى السلة"
    const token = localStorage.getItem('Token');
    if (!token) {
      this.router.navigate(['/auth']);
    }

    console.log(prodId);
    const data =
    {
      userId: this.userId,
      productId: prodId,
      quantity: 1
    }

    console.log(data);

    this.callApi.addToCart(data).subscribe({
      next: (response) => {
        console.log(response);
        this.callApi.updateCartCount(this.userId);

        this.toastr.success('تم إضافة المنتج إلي السلة بنجاح!');
      }
    })

  }

  isFavourite(productId: number): boolean {
    return this.favourites.has(productId); // التحقق مما إذا كان المنتج في المفضلة
  }

  favourites: Set<number> = new Set(); // لتخزين المنتجات المفضلة

  toggleFavourite(productId: number): void {

    const token = localStorage.getItem('Token');
    if (!token) {
      this.router.navigate(['/auth']);
    }



    if (!this.userId) {
      console.error('المستخدم غير مسجل دخول.');
      return;
    }

    const favouriteIndex = this.favouritesList.findIndex((fav: { productId: number }) => fav.productId === productId);

    if (favouriteIndex !== -1) {
      // حذف من المفضلة
      const favouriteIdToDelete = this.favouritesList[favouriteIndex].id;
      this.callApi.removeFromFavourites(favouriteIdToDelete).subscribe({
        next: () => {
          this.favouritesList.splice(favouriteIndex, 1);
          this.updateFavouritesSet();
          console.log('تم الحذف بنجاح:', this.favourites);
          this.callApi.updateWishlistCount(this.userId);

          this.toastr.success('تم حذف المنتج من المفضلة بنجاح!');

        },
        error: (err) => console.error('خطأ في الحذف:', err)
      });
    } else {
      // إضافة إلى المفضلة
      this.callApi.addToFavourites(this.userId, productId).subscribe({
        next: (newFavourite: { id: number, productId: number }) => {
          this.favouritesList.push(newFavourite);
          this.updateFavouritesSet();
          console.log('تمت الإضافة بنجاح:', this.favourites);
          this.callApi.updateWishlistCount(this.userId);

          this.toastr.success('تم إضافة المنتج إلي المفضلة بنجاح!');

        },
        error: (err) => console.error('خطأ في الإضافة:', err)
      });
    }
  }


  // تحميل المفضلة عند بدء التشغيل
  loadFavourites() {
    if (!this.userId) return;

    this.callApi.GetProductFavouriteByUserId(this.userId).subscribe({
      next: (favourites) => {
        this.favouritesList = favourites;
        this.updateFavouritesSet();
      },
      error: (err) => console.error("خطأ في تحميل المفضلة:", err)
    });
  }

  // تحديث Set بعد التعديل
  updateFavouritesSet(): void {
    this.favourites = new Set(this.favouritesList.map((fav: { productId: number }) => fav.productId));
  }

  private carousels: { [key: string]: bootstrap.Carousel } = {};

  ngAfterViewInit() {
    setTimeout(() => {
      document.querySelectorAll('.carousel').forEach((carouselElement) => {
        const id = carouselElement.getAttribute('id');
        if (id && !this.carousels[id]) {
          this.carousels[id] = new bootstrap.Carousel(carouselElement, {
            interval: 3000,
            wrap: true
          });
        }
      });
    }, 1000); // تأخير للتأكد من تحميل العناصر
  }

  intervals: { [key: string]: any } = {}; // ✅ تعريف intervals لتخزين المؤقتات

  startCarousel(id: string) {
    console.log('Starting carousel manually:', id);

    if (!this.carousels[id]) {
      const element = document.getElementById(id);
      if (element) {
        this.carousels[id] = new bootstrap.Carousel(element, {
          interval: false, // منع التشغيل التلقائي
          wrap: true
        });
      }
    }

    // إذا كان هناك تشغيل سابق، امسحيه أولاً
    if (this.intervals[id]) {
      clearInterval(this.intervals[id]);
    }

    // إنشاء مؤقت للتبديل بين الشرائح يدويًا
    this.intervals[id] = setInterval(() => {
      if (this.carousels[id]) {
        this.carousels[id].next(); // الانتقال للصورة التالية
      }
    }, 2000); // تغيير الشريحة كل ثانيتين (يمكنك تعديلها حسب الحاجة)
  }

  pauseCarousel(id: string) {
    console.log('Pausing and resetting carousel:', id);

    if (this.carousels[id]) {
      this.carousels[id].pause(); // إيقاف التقليب
      this.carousels[id].to(0); // الرجوع إلى أول صورة فورًا
    }

    // إيقاف المؤقت إذا كان موجودًا
    if (this.intervals[id]) {
      clearInterval(this.intervals[id]);
      delete this.intervals[id];
    }
  }

  getPriceAfterDiscount(disc: number, oldPrice: number): number {
    return oldPrice - (oldPrice * (disc / 100));
  }

  getFlvourName(flavorId: number): string {
    return this.TeaFlavorsAr[flavorId] || " ";
  }

  TeaFlavorsAr: string[] = [
    "شاي المانجو",
    "شاي التفاح والكراميل",
    "شاي فراولة الشيكولاتة",
    "شاي الرمان",
    "شاي اللافندر",
    "شاي التوت الأحمر",
    "شاي النعناع المغربي",
    "شاي الشوكولاتة بالنعناع",
    "شاي القطيفة الأولى",
    "شاي الياسمين والبرتقال",
    "شاي الليمون الحمضي",
    "شاي الليمون والعسل",
    "شاي الخوخ الأخضر",
    "شاي Tranquility",
    "شاي التفاح والقرفة",
    "شاي بلو بيري بلوز",
    "شاي Chai",
    "شاي جوز الهند",
    "شاي الليمون بالجنزبيل",
    "شاي Luscious Lavender",
    "شاي المورينجا والكركم",
    "شاي البابونج والبرتقال",
    "شاي الرويبوس بالنعناع",
    "شاي ثمر الورد والخوخ",
    "شاي الفواكه الاستوائية"
  ];

}
