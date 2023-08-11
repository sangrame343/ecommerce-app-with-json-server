import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logIn, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isuserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        this.isuserLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
        console.warn('result', result);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('user')) {
      this.isuserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
  userLogin(data: logIn) {
    console.warn(data);
    this.http
      .get(
        `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length) {
          console.warn('user logged in');
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          console.warn('user login failed');
          this.isLoginError.emit(true)
        }
      });
  }
}
