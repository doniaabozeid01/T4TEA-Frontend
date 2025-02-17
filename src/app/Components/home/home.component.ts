import { Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  countdown: string = '';

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    let countDownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }



  reviews = [
    { text: "أفضل شاي جربته على الإطلاق! الطعم لا يقاوم!", rating: 5, author: "أحمد حسن" },
    { text: "نكهة مميزة ورائعة، سأطلبه مرة أخرى بالتأكيد!", rating: 4, author: "منى السيد" }
  ];


  features = [
    { icon: 'fa-solid fa-leaf', title: 'طبيعي 100%', description: 'شاي بدون أي إضافات صناعية.' },
    { icon: 'fa-solid fa-star', title: 'أعلى جودة', description: 'مصنوع من أوراق الشاي الفاخرة.' },
    { icon: 'fa-solid fa-mug-hot', title: 'نكهات متنوعة', description: 'مجموعة واسعة من النكهات لتناسب جميع الأذواق.' }
  ];


  offers = [
    { id:1, image: '../../../assets/i.jpg' },
    { id:2, image: '../../../assets/f.jpg' },
    { id:3, image: '../../../assets/g.jpg' }
  ];
  
  dailyOffers = [
    { name: 'شاي بالنعناع', image: '../../../assets/12.png', oldPrice: 100, newPrice: 80 },
    { name: 'شاي بالليمون', image: '../../../assets/12.png', oldPrice: 120, newPrice: 95 },
    { name: 'شاي بالفراولة', image: '../../../assets/12.png', oldPrice: 110, newPrice: 90 }
  ];

  weeklyOffers = [
    { name: 'شاي أخضر', image: '../../../assets/12.png', oldPrice: 130, newPrice: 100 },
    { name: 'شاي أحمر', image: '../../../assets/12.png', oldPrice: 140, newPrice: 110 },
    { name: 'شاي بالعسل', image: '../../../assets/12.png', oldPrice: 150, newPrice: 120 }
  ];

  vipOffers = [
    { name: 'شاي الزعفران', image: '../../../assets/12.png', oldPrice: 200, newPrice: 170 },
    { name: 'شاي باللافندر', image: '../../../assets/12.png', oldPrice: 180, newPrice: 150 },
    { name: 'شاي بالقرفة', image: '../../../assets/12.png', oldPrice: 190, newPrice: 160 }
  ];

  categories:any = [
    {id:1 ,image:'../../../assets/11.jpg' ,title:'شاي أسود', description:"تجربة غنية بنكهة الشاي الأسود الأصيلة، تعزز التركيز وتنشط الحواس."},
    {id:2 ,image:'../../../assets/22.jpg' ,title:'شاي أخضر', description:"شاي أخضر منعش، يساعد على الاسترخاء ويدعم صحة الجسم العامه."},
    {id:3 ,image:'../../../assets/33.jpg' ,title:'شاي أعشاب', description:"خليط من الأعشاب الطبيعية المهدئة، يبعث على الراحة والهدوء."},
  ]

}
