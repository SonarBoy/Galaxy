import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  onLoginSubmit(): void{
    this.authService.authenticateUser(this.user).subscribe(data => {

      if(data.success){
        this.router.navigate(['/']);
        this.authService.storeUserData(data.token, data.user);
      }else{
        this.router.navigate(['/']);
        console.log(data);
      }

    });
  }

}
