import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  constructor(private router: Router) { }


  product: any = 
    {
      image:'../../../assets/6Q1A1601.JPG',
      title: 'Red Berry',
      description: '"Red Berry" هو شاي طبيعي يحتوي على مزيج فريد من التوت الأزرق مع خصائص غذائية وفوائد صحية رائعة. يتم تحضيره باستخدام أفضل المكونات لضمان نكهة لذيذة وعميقة مع كل رشفة.',
      benifits: [
        {benifit:'يساعد على تحسين صحة الجهاز المناعي.'},
        {benifit:'يحتوي على مضادات أكسدة قوية تعزز من الصحة العامة.'},
        {benifit:'يخفف من التوتر والقلق ويعزز من الاسترخاء.'},
      ],
      newPrice:152,
      oldPrice:180,
      discount:18,



    }
  ;
  priceRange = { min: 10, max: 200 };
  ratingFilter = 'all';
  flavorFilter = 'all';
  offerFilter = 'all';

  products = [
    {
      id: 1,
      name: 'شاي الصعيد - المانجو',
      description: 'نكهة منعشة من المانجو الطبيعي مع أفضل أنواع الشاي.',
      oldPrice: 150,
      newPrice: 120,
      discount: 20,
      rating: 4.8,
      offer: true,
      images: [
        '../../../assets/6Q1A1601.JPG', '../../../assets/6Q1A1663 (1).png',
      ]
    },
    {
      id: 2,
      name: 'شاي الصعيد - الفراولة',
      description: 'طعم الفراولة المميز ممزوج بأفضل أوراق الشاي.',
      oldPrice: 140,
      newPrice: 110,
      discount: 21,
      rating: 4.5,
      offer: true,
      images: [
        '../../../assets/6Q1A1601.JPG', '../../../assets/6Q1A1663 (1).png',
      ]
    },
    {
      id: 3,
      name: 'شاي الصعيد - اللافندر',
      description: 'نكهة اللافندر المهدئة مع مزيج شاي فاخر.',
      oldPrice: 160,
      newPrice: 130,
      discount: 18,
      rating: 4.7,
      offer: false,
      images: [
        '../../../assets/6Q1A1601.JPG', '../../../assets/6Q1A1663 (1).png',
      ]
    }
  ];

  filteredProducts = [...this.products];

  ngOnInit() {
    const range = document.getElementById('priceRange') as HTMLInputElement;
    range?.style.setProperty('--progress', `50%`);
  }

  updatePriceLabel() {
    const range = document.getElementById('priceRange') as HTMLInputElement;
    if (range) {
      const percentage = ((+range.value - +range.min) / (+range.max - +range.min)) * 100;
      range.style.setProperty('--progress', `${percentage}%`);
    }
  }

  goToDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }


  goToCart(event: MouseEvent, id: number) {
    event.stopPropagation(); // منع الانتقال إلى صفحة التفاصيل عند النقر على "اضف الى السلة"
    // هنا يمكنك تنفيذ الكود الخاص بإضافة المنتج إلى السلة
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
    event.stopPropagation(); // لمنع تأثير click على الـ card

    if (this.favourites.has(productId)) {
      this.favourites.delete(productId); // إزالة المنتج من المفضلة
    } else {
      this.favourites.add(productId); // إضافة المنتج إلى المفضلة
    }

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


  categories = ['أسود', 'أخضر', 'أعشاب'];
  flavors = ['مانجو', 'فراولة', 'لافندر'];
  selectedCategory = '';
  selectedFlavor = '';
  selectedPrice = 250;

  applyFilters() {
    console.log('الفلاتر المختارة:', {
      category: this.selectedCategory,
      flavor: this.selectedFlavor,
      price: this.selectedPrice
    });
  }
  searchQuery = "";

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      (this.ratingFilter === "all" || product.rating >= +this.ratingFilter) &&
      (this.flavorFilter === "all" || product.name.includes(this.flavorFilter)) &&
      (this.offerFilter === "all" || product.offer) &&
      (this.searchQuery === "" || product.name.includes(this.searchQuery))
    );
  }
}
