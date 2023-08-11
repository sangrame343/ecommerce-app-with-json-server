import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  sellerName: string = 'default';
  menuType: string = 'default';
  userName: string = '';
  searchResult: product[] | undefined;
  cartItem=0;
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        //console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }

        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    //console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  userlogOut() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
