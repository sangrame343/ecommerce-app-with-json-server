import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon=faTrash;
  editIcon=faPenToSquare;
  constructor(private product: ProductService,private router:Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productLists();
  }
  deleteProduct(id: number) {
    console.warn('test id', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        alert('Product is deleted');
        this.productLists();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  productLists() {
    this.product.productListing().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }
  
}
