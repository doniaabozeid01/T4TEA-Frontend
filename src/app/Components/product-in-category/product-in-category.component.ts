import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Interfaces/category';
import { Product } from 'src/app/Interfaces/product';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-product-in-category',
  templateUrl: './product-in-category.component.html',
  styleUrls: ['./product-in-category.component.scss']
})
export class ProductInCategoryComponent {
  orderId: string | null = null; // متغير لتخزين الـ ID

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private callApis : CallApisService , private toastr : ToastrService) { 
    // this.updateFavouritesSet();
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

  priceRange = { min: 10, max: 1000 };
  ratingFilter = 'all';
  flavorFilter = 'all';
  offerFilter = 'all';
  baseUrl!:string;
  userId: any;
  favouritesList: any;

  products:any;
  filteredProducts!:any;
  title!:string ;


  ngOnInit() {
    this.baseUrl = this.callApis.baseUrl;
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id'); // سحب الـ ID من الرابط
    console.log(this.orderId);
    
    this.callApis.GetProductsOfSpecificCategory(Number(this.orderId)).subscribe({
      next:(response)=>{
        console.log(response);
        this.title = response.name;
        this.products = response.products;
        
        this.filteredProducts = [...this.products];
      }
    })



    this.callApis.getUserId().subscribe({
      next: (response) => {
        console.log(response);

        console.log('User ID:', response.userId);
        this.userId = response.userId;


        this.callApis.GetProductFavouriteByUserId(this.userId).subscribe({
          next: (favouritesData: { id: number, productId: number }[]) => {
            this.favouritesList = favouritesData; // تحميل البيانات
            this.updateFavouritesSet(); // تحديث الـ Set لضبط الأيقونات
          },
          error: (err) => console.error('خطأ في جلب المفضلة:', err)
        });
      },
      error: (err) => {
        console.error('خطأ في جلب معرف المستخدم:', err);
      }
    });

    const range = document.getElementById('priceRange') as HTMLInputElement;
    range.style.setProperty('--progress', `100%`);
  }




  goToDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }


  goToCart(event: MouseEvent, prodId: number) {
    event.stopPropagation(); // منع الانتقال إلى صفحة التفاصيل عند النقر على "اضف الى السلة"

    // if (product.inStock) {
    //   console.log(`${product.name} تمت إضافته إلى السلة!`);
    // }

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
        console.log(response);
        this.callApis.updateCartCount(this.userId);
        this.toastr.success('تم إضافة المنتج إلي السلة بنجاح!');

      }
    })

  }

  goToWishlist(event: MouseEvent) {
    event.stopPropagation(); // منع الانتقال إلى صفحة التفاصيل عند النقر على "القلب"
    // هنا يمكنك تنفيذ الكود الخاص بإضافة المنتج إلى قائمة الرغبات
  }


  @ViewChild('filtersPanel', { static: false }) filtersPanel!: ElementRef;
  toggleFilters(): void {
    if (this.filtersPanel) {
      this.filtersPanel.nativeElement.classList.toggle('show');
    }
  }


  isFavourite(productId: number): boolean {
    return this.favourites.has(productId); // التحقق مما إذا كان المنتج في المفضلة
  }


  favourites: Set<number> = new Set(); // لتخزين المنتجات المفضلة


  toggleFavourite(event: Event, productId: number): void {

    const token = localStorage.getItem('Token');
    if(!token){
      this.router.navigate(['/auth']);
    }


    event.stopPropagation(); // منع تأثير click على الـ card
  
    if (!this.userId) {
      console.error('المستخدم غير مسجل دخول.');
      return;
    }
  
    // البحث عن المنتج في المفضلة
    const favouriteIndex = this.favouritesList.findIndex((fav: { productId: number }) => fav.productId === productId);
  
    if (favouriteIndex !== -1) {
      // المنتج موجود، نحذفه
      const favouriteIdToDelete = this.favouritesList[favouriteIndex].id;
  
      this.callApis.removeFromFavourites(favouriteIdToDelete).subscribe({
        next: () => {
          this.favouritesList.splice(favouriteIndex, 1); // حذف العنصر من المصفوفة
          this.updateFavouritesSet(); // تحديث Set بعد الحذف
          console.log('تم الحذف بنجاح:', this.favourites);
          this.callApis.updateWishlistCount(this.userId);

          this.toastr.success('تم حذف المنتج من المفضلة بنجاح!');

        },
        error: (err) => console.error('خطأ في الحذف:', err)
      });
    } else {
      // المنتج غير موجود، نضيفه
      this.callApis.addToFavourites(this.userId, productId).subscribe({
        next: (newFavourite: { id: number, productId: number }) => {
          this.favouritesList.push(newFavourite); // إضافة العنصر للمصفوفة
          this.updateFavouritesSet(); // تحديث Set بعد الإضافة
          console.log('تمت الإضافة بنجاح:', this.favourites);
          this.callApis.updateWishlistCount(this.userId);

          this.toastr.success('تم إضافة المنتج إلي المفضلة بنجاح!');

        },
        error: (err) => console.error('خطأ في الإضافة:', err)
      });
    }
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




  // categories = ['أسود', 'أخضر', 'أعشاب'];
  flavors = this.TeaFlavorsAr;
  selectedCategory = '';
  selectedFlavor = 'all';
  selectedPrice = this.priceRange.min;


  searchQuery: string = ''; // متغير البحث


  getFlvourName(flavorId: number): string {
    return this.TeaFlavorsAr[flavorId] || " ";

  }
  




  getPriceAfterDiscount(disc:number, oldPrice:number):number{
    return oldPrice - (oldPrice * (disc / 100));
  }


  applyFilters(product: Product): boolean {
    console.log("product : ", product);
    
    // 1️⃣ فلتر البحث
    const matchesSearch = this.searchQuery
      ? product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getFlvourName(product.flavour).toLowerCase().includes(this.searchQuery.toLowerCase()) 
      : true;
  
    // 2️⃣ فلتر السعر
    const matchesPrice = this.getPriceAfterDiscount(product.discount,product.oldPrice) >= this.selectedPrice && this.getPriceAfterDiscount(product.discount,product.oldPrice) <= this.priceRange.max;

  
    // 3️⃣ فلتر التقييم
    const matchesRating = this.ratingFilter === 'all' || product.rate >= parseInt(this.ratingFilter, 10);
  
    // 4️⃣ فلتر النكهة
    const matchesFlavor = this.selectedFlavor === 'all' || this.getFlvourName(product.flavour) === this.selectedFlavor;
  
    // 5️⃣ فلتر العروض
    const matchesOffer = this.offerFilter === 'all' || (this.offerFilter === 'offers' && product.discount > 0);
  
    console.log(this.filterProducts);

    // ✅ عودة المنتج إذا اجتاز جميع الفلاتر
    return matchesSearch && matchesPrice && matchesRating && matchesFlavor && matchesOffer;
  }

  
  filterProducts() {
    if (!this.products || !Array.isArray(this.products)) {
      console.error("products is undefined or not an array!", this.products);
      return;
    }
  
    console.log("this.products : ", this.products);
  
    // ⚡ تأكد من أن this.products هو مصفوفة من المنتجات مباشرة وليس من الفئات
    this.filteredProducts = this.products.filter((product: Product) => this.applyFilters(product));
  
    console.log("Filtered Products:", this.filteredProducts);
  }
  
  
  


  updateProgress() {
    const range = document.getElementById('priceRange') as HTMLInputElement;
    range.style.setProperty('--progress', `100%`);
  }


  updatePriceLabel() {
    const range = document.getElementById('priceRange') as HTMLInputElement;

    // نسبة التقدم بناءً على الفرق بين `selectedPrice` و `min`
    const min = parseInt(range.min);
    const max = parseInt(range.max);
    const value = parseInt(range.value);

    const progress = ((value - min) / (max - min)) * 100;

    // تحديث الخط من `min` إلى `selectedPrice`
    range.style.setProperty('--progress', `${progress}%`);

    // تحديث الفلاتر عند تحريك الشريط
    this.filterProducts();
  }
  
}
