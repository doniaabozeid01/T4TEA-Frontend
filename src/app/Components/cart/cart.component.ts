import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private router: Router, private callApi: CallApisService, private toastr: ToastrService) { }
  products: any;


  userId: any;
  baseUrl: any;
  // subTotal: number = 0;

  // ngOnInit(): void {

  //   this.baseUrl = this.callApi.baseUrl;
  //   this.callApi.getUserId().subscribe({
  //     next: (response) => {
  //       this.userId = response.userId;

  //       this.callApi.GetCartByUserId(this.userId).subscribe({
  //         next: (res) => {
  //           console.log(res);
  //           this.products = res;
  //           for(let i=0 ; i< res.count; i++){
  //             this.subTotal+= res[i].quantity * (res[i].product.oldPrice - (res[i].product.oldPrice * res[i].product.discount)) ;
  //             console.log(this.subTotal);

  //           }
  //         }
  //       })
  //     }
  //   })
  // }





  subTotal: number = 0; // حل المشكلة
  total: number = 0; // حل المشكلة
  discount: number = 10;

  ngOnInit(): void {
    this.baseUrl = this.callApi.baseUrl;
    this.callApi.getUserId().subscribe({
      next: (response) => {
        this.userId = response.userId;

        this.callApi.GetCartByUserId(this.userId).subscribe({
          next: (res) => {
            console.log("res : ", res);
            this.products = res;

            // تأكد من أن res يحتوي على بيانات صحيحة
            if (res && res.length > 0) {
              this.subTotal = 0; // إعادة ضبط القيمة عند تحميل البيانات

              for (let i = 0; i < res.length; i++) {
                this.subTotal += res[i].quantity *
                  (res[i].product.oldPrice - (res[i].product.oldPrice * (res[i].product.discount / 100)));
              }
              this.updateTotal();

              console.log(this.subTotal);
            }
          }
        });
      }
    });
  }




  removeProduct(id: number) {
    console.log(id);

    this.callApi.deleteProductFromCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response;
        this.updateSubTotal();
        this.updateTotal();
        this.callApi.updateCartCount(this.userId);

        this.toastr.success('تم حذف المنتج من السلة بنجاح!');

      }
    });
  }

  increaseQuantity(id: number, item: any) {
    if (item.quantity < 10) { // يمكنك تعديل الحد الأعلى حسب الحاجة
      item.quantity++;

      const cartdata = {

        userId: this.userId,
        productId: item.productId,
        quantity: item.quantity

      }

      console.log(cartdata);
      
      this.callApi.updateCart(id,cartdata).subscribe({
        next:(response)=>{
          console.log(response);
        }
      })

      this.updateSubTotal();
      this.updateTotal();

    }
  }

  decreaseQuantity(id:number, item: any) {
    if (item.quantity > 1) { // يمكنك تعديل الحد الأدنى حسب الحاجة
      item.quantity--;


      const cartdata = {

        userId: this.userId,
        productId: item.productId,
        quantity: item.quantity

      }

      console.log(cartdata);
      
      this.callApi.updateCart(id,cartdata).subscribe({
        next:(response)=>{
          console.log(response);
        }
      })


      this.updateSubTotal();
      this.updateTotal();

    }
  }

  goToPayment(): void {
    this.router.navigate(['/payment'])
  }

  getPriceAfterDiscount(disc: number, oldPrice: number): number {
    return oldPrice - (oldPrice * (disc / 100));
  }

  updateSubTotal() {
    this.subTotal = this.products.reduce((total: number, item: any) => {
      return total + (item.quantity * (item.product.oldPrice - (item.product.oldPrice * (item.product.discount / 100))));
    }, 0);
  }


  updateTotal() {
    this.total = parseFloat((this.subTotal - (this.subTotal * (this.discount / 100))).toFixed(2));
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
