import { Component, OnInit } from '@angular/core';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit{

  
  orders: any[] = [];  // مصفوفة الطلبات
  userId: any;

  constructor(private callApi: CallApisService) {}

  ngOnInit(): void {
    this.callApi.getUserId().subscribe({
      next: (response) => {
        console.log("User ID:", response.userId);
        this.userId = response.userId;

        if (this.userId) { 
          this.callApi.getAllOrdersByUserId(this.userId).subscribe({
            next: (ordersResponse) => {
              console.log("الطلبات:", ordersResponse);
              // this.orders = ordersResponse;
              this.orders = ordersResponse.sort(
                (a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );


              // ✅ بعد جلب الطلبات، نجلب تفاصيل كل طلب
              this.orders.forEach((order, index) => {
                this.callApi.getCartOrdersByorderId(order.id).subscribe({
                  next: (detailsResponse) => {
                    console.log(`تفاصيل الطلب ${order.id}:`, detailsResponse);
                    
                    // تحديث الطلب الحالي بالـ items الخاصة به
                    this.orders[index].items = detailsResponse;
                  },
                  error: (err) => {
                    console.error(`خطأ في جلب تفاصيل الطلب ${order.id}:`, err);
                  }
                });
              });

            },
            error: (err) => {
              console.log("خطأ في جلب الطلبات:", err);
            }
          });
        }
      },
      error: (err) => {
        console.log("خطأ في جلب User ID:", err);
      }
    });
  }
  





  getOrderStatusClass(status: number): string {
    switch (status) {
      case 0:
        return 'processing';
      case 1:
        return 'confirmed';
      case 2:
        return 'shipped';
      case 3:
        return 'Delivered';
      case 4:
        return 'Cancelled';
      default:
        return '';
    }
  }

  getOrderStatus(status: number): string {
    switch (status) {
      case 0:
        return 'تحت المعالجه';
      case 1:
        return 'مؤكد';
      case 2:
        return 'تم الشحن';
      case 3:
        return 'تم التسليم';
      case 4:
        return 'تم الالغاء';
      default:
        return '';
    }
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
