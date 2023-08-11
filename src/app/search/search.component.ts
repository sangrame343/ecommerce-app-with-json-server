import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  serachResult:undefined|product[];
  isNotFound: boolean = false;
constructor(private activeRoute:ActivatedRoute,private product:ProductService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  let query=this.activeRoute.snapshot.paramMap.get('query')
  console.warn(query);
  
  query&&this.product.searchProducts(query).subscribe((result)=>{
  this.serachResult=result;
  if (result.length === 0) {
    this.isNotFound = true;
  } else {
    this.isNotFound = false;
    this.serachResult = result;
  }
  })
  
}
}
