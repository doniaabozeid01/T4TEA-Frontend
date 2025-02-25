import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApisService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = "https://localhost:7095";




  //////////////////////////////////////////////////////////////////////////


  // ✅ عدد المنتجات في المفضلة
  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  // ✅ عدد المنتجات في السلة
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // ✅ تحديث عدد المفضلة من الـ API
  updateWishlistCount(userId: string) {
    this.GetProductFavouriteByUserId(userId).subscribe({
      next: (response) => {
        this.wishlistCountSubject.next(response.length);
      },
      error: (err) => {
        console.error("خطأ في تحديث عدد المفضلة:", err);
      }
    });
  }

  // ✅ تحديث عدد السلة من الـ API
  updateCartCount(userId: string) {
    this.GetCartByUserId(userId).subscribe({
      next: (response) => {
        this.cartCountSubject.next(response.length);
      },
      error: (err) => {
        console.error("خطأ في تحديث عدد السلة:", err);
      }
    });
  }


  //////////////////////////////////////////////////////////////////////////

  GetAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Categories/GetAllCategories`);
  }


  GetProductsOfSpecificCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Categories/GetCategoryWithProductsById/${id}`);
  }


  GetAllAdvertise(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Advertise/GetAllAdvertise`);
  }

  GetAllReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Reviews/GetAllReviews`);
  }

  GetOriginalOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Products/GetAllProductWithOriginalOffer`)
  }


  GetVIPOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Products/GetAllProductWithVIPOffer`)
  }


  GetAllCategoriesWithProductsIn(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Categories/GetAllCategoriesWithProducts`)
  }


  Login(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/login`, body)
  }

  Register(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/userRegister`, body)
  }


  addToFavourites(userId: number, productId: number): Observable<any> {
    console.log("userId : ", userId, "productId : ", productId);

    return this.http.post(`${this.baseUrl}/api/ProductFavourite/AddProductFavourite`, { userId, productId });
  }

  removeFromFavourites(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/ProductFavourite/DeleteProductFavourite/${productId}`);
  }


  getUserId(): Observable<{ userId: number }> {
    const token = localStorage.getItem('Token'); // الحصول على التوكن
    console.log(token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ userId: number }>(`${this.baseUrl}/api/Account/getUserId`, { headers });
  }



  getUserName(): Observable<any> {
    const token = localStorage.getItem('Token'); // الحصول على التوكن
    console.log(token);

    // if (!token) {
    //   this.router.navigate(['/auth']); // إعادة التوجيه إلى صفحة تسجيل الدخول
    //   // throw new Error('المستخدم غير مسجل دخول.');
    // }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/api/Account/getFullName`, { headers });
  }




  GetProductFavouriteByUserId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ProductFavourite/GetProductFavouriteByUserId/${id}`)
  }
  // getFavourites(): Observable<number[]> {
  //   return this.http.get<number[]>(`${this.baseUrl}/list`);
  // }


  addToCart(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Cart/AddCart`, data);
  }


  GetCartByUserId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Cart/GetCartByUserId/${id}`)
  }


  deleteProductFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Cart/DeleteCart/${id}`)
  }

  getAllOrdersByUserId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Payment/GetOrdersByUserId/${id}`)
  }

  getCartOrdersByorderId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Payment/GetOrderItemsByOrderRequestId/${id}`)
  }

  createOrder(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Payment/CreateOrder`, body)
  }




  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Payment/GetOrderById?id=${id}`)
  }


  addReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Reviews/AddReview`, data)
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Products/GetProductById/${id}`);
  }


  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Products/GetAllProducts`)
  }


  updateCart(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/api/Cart/UpdateCart/${id}`, data);
  }





  ForgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/forgotPassword`, data);
  }


  ResetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/resetPassword`, data);

  }




  GetShippingAndDiscount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ShippingAndDiscount/GetAllShippingAndDiscount`)
  }

}
