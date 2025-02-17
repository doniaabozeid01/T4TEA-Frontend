import { Component } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent {
  orders = [
    {
      items: [
        { productName: 'شاي الصعيد الفاخر', price: 100, quantity: 2, total: 200 },
        { productName: 'شاي اللافندر', price: 120, quantity: 1, total: 120 }
      ],
      totalAmount: 320,
      status: 'مكتمل'
    },
    {
      items: [
        { productName: 'شاي المانجو', price: 90, quantity: 3, total: 270 }
      ],
      totalAmount: 270,
      status: 'قيد التنفيذ'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
