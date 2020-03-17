import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  public onRegisterSubmit(): void{
    this.authService.registerUser(this.user).subscribe(data => {
      if(data.success){
        this.router.navigate(['/Users']);
      }else{
        this.router.navigate(['/Users']);
        console.log(data);
      }
    });
  }

}
