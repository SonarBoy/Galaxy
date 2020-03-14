import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  title:string;
  user:User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.title = this.activatedRoute.snapshot.data.title;
    this.user = new User();

    this.activatedRoute.params.subscribe(params => {
      this.user._id = params.id;
    });

  }


  public onDetailsSubmit():void{
    switch(this.title){
      case "Add User":
        this.userService.addUser(this.user).subscribe(data => {


          if(data.success){
            this.router.navigate(['/Users']);
          }else{
            this.router.navigate(['/Users']);
            console.log(data);
          }
        });
      break;
    }
  }

}
