import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined
  constructor(private product:ProductService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}
addProduct(data:product){
  this.product.addProduct(data).subscribe((result)=>{
    console.warn(result)
    if(result){
      this.addProductMessage="product added successfully"
    }
    setTimeout(()=>{
      this.addProductMessage=undefined
    },3000)
  })

}
}
