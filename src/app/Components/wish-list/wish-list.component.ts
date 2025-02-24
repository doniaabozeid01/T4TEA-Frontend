import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {






  products: any = [];

  addToCart(prodId: number) {
    // if (product.inStock) {
    //   console.log(`${product.name} تمت إضافته إلى السلة!`);
    // }

    console.log(prodId);
    const data=
      {
        userId: this.userId,
        productId: prodId,
        quantity: 1
      }
    
    this.callApis.addToCart(data).subscribe({
      next:(response)=>{
        console.log(response);
        this.callApis.updateCartCount(this.userId);

        this.toastr.success('تم إضافة المنتج إلي السلة بنجاح!');

      }
    })
    
  }

  removeProduct(favId: number) {
    // this.products.splice(index, 1); // حذف العنصر من المصفوفة
    this.callApis.removeFromFavourites(favId).subscribe({
      next:(response)=>{
        console.log(response);
      
        this.products = response;
        this.callApis.updateWishlistCount(this.userId);
        this.toastr.success('تم حذف المنتج من المفضلة بنجاح!');

      }
    })
  }

  constructor(private callApis: CallApisService, private toastr: ToastrService) { }
  userId: any;
  baseUrl:any;

  ngOnInit(): void {

    this.baseUrl = this.callApis.baseUrl;


    this.callApis.getUserId().subscribe({
      next: (response) => {
        console.log(response);

        console.log('User ID:', response.userId);
        this.userId = response.userId;


        this.callApis.GetProductFavouriteByUserId(this.userId).subscribe({
          next: (response) => {
            console.log(response);
            
            this.products = response; // تحميل البيانات
          },
          error: (err) => console.error('خطأ في جلب المفضلة:', err)
        });
      },
      error: (err) => {
        console.error('خطأ في جلب معرف المستخدم:', err);
      }
    });




  }





  getPriceAfterDiscount(disc:number, oldPrice:number):number{
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
    "شاي الألفندر",
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
