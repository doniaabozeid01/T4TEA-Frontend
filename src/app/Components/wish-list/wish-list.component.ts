import { Component } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {
  products: any = [
     { id: 1, name: 'شاي الصعيد', price: 50, image: '../../../assets/12.png'},
   { id: 2, name: 'شاي الفراولة', price: 60, image: '../../../assets/12.png' },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png' },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png' },
    { id: 3, name: 'شاي اللافندر', price: 70, image: '../../../assets/12.png'},
  ];

  addToCart(product: any) {
    if (product.inStock) {
      console.log(`${product.name} تمت إضافته إلى السلة!`);
    }
  }

  removeProduct(index: number) {
    this.products.splice(index, 1); // حذف العنصر من المصفوفة
  }
  
}
