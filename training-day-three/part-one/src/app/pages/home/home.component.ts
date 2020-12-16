import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: any;

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(private service: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit():void {
    // console.log('old value', this.logins);

    this.service.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );

    this.service.checkLogStatus();
  }

  onLogin():void {
    // console.log('new value', this.logins);
    this.service.httpLogin(this.logins);

    this.service.onHttpLogin.subscribe(
      (response: any) => {
        const token = response.token;
        this.service.setToken(token);

        console.log('token from service', this.service.getToken());
        this.route.navigate(['/my-profile']);
      }
    )
  }

  onLogout():void {
    this.service.deleteToken();
  }




}
