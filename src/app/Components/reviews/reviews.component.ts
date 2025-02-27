import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit{


  orderId: any;
  products: any[] = []; // قائمة المنتجات داخل الطلب
  orderItems:any[] = [];
  selectedProduct: any;
  rating: number = 0;
  comment: string = '';
  userId:any;
  isAdding: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private callApi : CallApisService, private toastr : ToastrService) {}

  ngOnInit() {

    this.callApi.getUserId().subscribe({
      next:(response)=>{
        console.log(response);
        this.userId = response.userId;
        
      }
    })

    this.orderId = this.route.snapshot.paramMap.get('orderId');

    this.callApi.getCartOrdersByorderId(this.orderId).subscribe({
      next:(response)=>{
        // console.log(response[0].product.name);
        this.orderItems=response;
        this.selectedProduct = this.orderItems[0]; // 🔥 حفظ الكائن بأكمله
        console.log(this.selectedProduct);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  errorMessage: string = ''; // 🔥 تخزين رسالة الخطأ

submitReview() {
  this.isAdding= true;

  this.errorMessage = ''; // تصفير الرسالة قبل كل محاولة

  if (!this.comment || this.rating === 0) {
    this.errorMessage = 'يرجى إضافة تعليق وتحديد تقييم.';
    return;
  }

  // 🔥 إنشاء بيانات التقييم لإرسالها إلى الـ API
  const reviewData = {
    userId: this.userId,
    productId: this.selectedProduct.id, // تأكد أن selectedProduct كائن صحيح
    rating: this.rating,
    comment: this.comment
  };

  // 🔥 إرسال التقييم إلى API
  this.callApi.addReview(reviewData).subscribe({
    next: () => {
      this.isAdding= false;

      // ✅ عند نجاح التقييم، الانتقال إلى صفحة الطلبات
      this.toastr.success('تم إضافة التعليق بنجاح!');
      this.router.navigate(['/all-orders']);

    },
    error: (err) => {
      this.isAdding= false;

      console.log("خطأ في إرسال التقييم:", err);
      this.errorMessage = 'حدث خطأ أثناء إرسال التقييم. حاول مرة أخرى.';
    }
  });
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
