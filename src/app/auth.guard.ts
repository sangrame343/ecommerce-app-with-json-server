import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const router = inject(Router);
  if (sellerService.isSellerLoggedIn) {
    return true;
  }
  if(localStorage.getItem('seller')){
   return true;
   }
  return router.parseUrl('/seller-auth');
  //return this.sellerService.isSellerLoggedIn;
};
