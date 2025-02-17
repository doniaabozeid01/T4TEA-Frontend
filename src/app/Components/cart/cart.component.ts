import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private router:Router){}
  products: any = [
    { id: 1, name: 'شاي الصعيد', price: 50, image: '../../../assets/123.JPG', quantity: 1},
    { id: 2, name: 'شاي الفراولة', price: 60, image: '../../../assets/test.png', quantity: 1 },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/test2.png', quantity: 1},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/tst.png', quantity: 1},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1 },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1 },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/6Q1A1662.png', quantity: 1},
  ];

  addToCart(product: any) {
    if (product.inStock) {
      console.log(`${product.name} تمت إضافته إلى السلة!`);
    }
  }

  removeProduct(index: number) {
    this.products.splice(index, 1); // حذف العنصر من المصفوفة
  }

  increaseQuantity(item:any) {
    if (item.quantity < 10) { // يمكنك تعديل الحد الأعلى حسب الحاجة
      item.quantity++;
    }
  }

  decreaseQuantity(item:any) {
    if (item.quantity > 1) { // يمكنك تعديل الحد الأدنى حسب الحاجة
      item.quantity--;
    }
  }

  goToPayment():void{
    this.router.navigate(['/payment'])
  }

}
