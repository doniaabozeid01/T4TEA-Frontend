import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // الطريقة الصحيحة لاستخدام Router
  const token = localStorage.getItem('Token');

  if (token) {
    return true; // المستخدم مسجل دخول، يُسمح له بالدخول
  } else {
    router.navigate(['/auth']); // إعادة التوجيه لصفحة تسجيل الدخول
    return false;
  }
};

