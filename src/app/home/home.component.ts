import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined|product[]
  trendyProducts:undefined|product[]
constructor(private product:ProductService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.product.popularProducts().subscribe((data)=>{
    console.warn(data);
    this.popularProducts=data;
    
  });
  this.product.trendyProducts().subscribe((data)=>{
    this.trendyProducts=data;
  })
}

}
