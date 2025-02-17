import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// declare var bootstrap: any; // تعريف bootstrap ليعمل مع TypeScript
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent {
  constructor(private router: Router ,private route: ActivatedRoute ) { 
  }

  priceRange = { min: 10, max: 1000 };
  ratingFilter = 'all';
  flavorFilter = 'all';
  offerFilter = 'all';

  categories = [
    {
      title: 'شاي أسود',
      products: [
        {
          id: 1,
          name: 'شاي الصعيد - المانجو',
          description: 'نكهة منعشة من المانجو الطبيعي مع أفضل أنواع الشاي.',
          oldPrice: 150,
          newPrice: 120,
          discount: 20,
          rating: 4.8,
          offer: true,
          flavor: 'مانجو',
          images: [
            '../../../assets/6Q1A1676.jpg', '../../../assets/6Q1A1680.png',

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
          flavor: 'فراولة',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

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
          flavor: 'لافندر',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        }
      ]
    },

    {
      title: 'شاي أخضر',
      products: [
        {
          id: 4,
          name: 'شاي الصعيد - المانجو',
          description: 'نكهة منعشة من المانجو الطبيعي مع أفضل أنواع الشاي.',
          oldPrice: 150,
          newPrice: 120,
          discount: 20,
          rating: 4.8,
          offer: true,
          flavor: 'مانجو',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        },
        {
          id: 5,
          name: 'شاي الصعيد - الفراولة',
          description: 'طعم الفراولة المميز ممزوج بأفضل أوراق الشاي.',
          oldPrice: 140,
          newPrice: 110,
          discount: 21,
          rating: 4.5,
          offer: true,
          flavor: 'فراوله',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        },
        {
          id: 6,
          name: 'شاي الصعيد - اللافندر',
          description: 'نكهة اللافندر المهدئة مع مزيج شاي فاخر.',
          oldPrice: 160,
          newPrice: 130,
          discount: 18,
          rating: 4.7,
          offer: false,
          flavor: 'لافندر',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        }
      ]
    },

    {
      title: 'شاي أعشاب',
      products: [
        {
          id: 7,
          name: 'شاي الصعيد - المانجو',
          description: 'نكهة منعشة من المانجو الطبيعي مع أفضل أنواع الشاي.',
          oldPrice: 150,
          newPrice: 120,
          discount: 20,
          rating: 4.8,
          offer: true,
          flavor: 'مانجو',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        },
        {
          id: 8,
          name: 'شاي الصعيد - الفراولة',
          description: 'طعم الفراولة المميز ممزوج بأفضل أوراق الشاي.',
          oldPrice: 140,
          newPrice: 110,
          discount: 21,
          rating: 4.5,
          offer: true,
          flavor: 'فراوله',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        },
        {
          id: 9,
          name: 'شاي الصعيد - اللافندر',
          description: 'نكهة اللافندر المهدئة مع مزيج شاي فاخر.',
          oldPrice: 160,
          newPrice: 250,
          discount: 18,
          rating: 4.7,
          offer: false,
          flavor: 'لافندر',
          images: [
            '../../../assets/12.png', '../../../assets/13.png',

          ]
        }
      ]
    }
  ];

  filteredProducts = [...this.categories];

  ngOnInit() {

    this.route.params.subscribe(() => {
      this.updateProgress();  // 🔄 تحديث عند كل تغيير في الرابط
    });




    // const range = document.getElementById('priceRange') as HTMLInputElement;
    // range.style.setProperty('--progress', `100%`);
  }

  updateProgress(){
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


  categoriesTitles = ['أسود', 'أخضر', 'أعشاب'];
  flavors = ['مانجو', 'فراولة', 'لافندر'];
  selectedCategory = '';
  selectedFlavor = 'all';
  selectedPrice: number = this.priceRange.max;


  searchQuery = "";

  filterProducts() {
    console.log('flavor : ', this.selectedFlavor);
    console.log('price : ', this.selectedPrice);
    console.log("this.priceRange.min ", this.priceRange.min, "  ,this.selectedPrice ", this.selectedPrice);


    this.filteredProducts = this.categories.map(category => {
      return {
        title: category.title,
        products: category.products.filter(product =>
          (this.ratingFilter === "all" || product.rating >= +this.ratingFilter) &&
          (this.selectedFlavor === "all" || product.flavor.includes(this.selectedFlavor)) &&
          (this.offerFilter === "all" || (this.offerFilter === "offers" && product.offer)) &&
          (this.searchQuery === "" || product.name.includes(this.searchQuery)) &&
          (product.newPrice >= this.priceRange.min && product.newPrice <= this.selectedPrice)
        )
      };
    }).filter(category => category.products.length > 0);
  }


}

