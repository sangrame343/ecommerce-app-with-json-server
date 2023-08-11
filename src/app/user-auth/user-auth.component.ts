import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(
    private user: UserService,
    private router: Router,
    private product: ProductService
  ) {}
  showUserLogin = false;
  authError: string = '';
  ngOnInit(): void {
    this.user.reloadSeller();
  }
  signUpUser(data: signUp): void {
    this.user.userSignUp(data);
  }
  userLogIn(data: logIn): void {
    this.authError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
      } else {
        this.localCarttoRemoteCart();
      }
    });
  }
  openUserLogin() {
    this.showUserLogin = true;
  }
  openUserSignUp() {
    this.showUserLogin = false;
  }
  localCarttoRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      cartDataList.forEach((product: product, index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        console.warn(cartData);
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert('product is stored in DB');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }
}
