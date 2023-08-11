import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  trendyProducts:undefined|product[]
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    //console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        //console.warn(result);
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
      this.product.trendyProducts().subscribe((data)=>{
        this.trendyProducts=data;
      })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem(`user`)) {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('user logged in');
        let user = localStorage.getItem(`user`);
        // console.log(JSON.parse(user));

        let userId = user && JSON.parse(user)[0].id;
        
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('product is added');
          }
        });
      }
    }
    
  }
  removeToCart(productId: number) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }
  
}
