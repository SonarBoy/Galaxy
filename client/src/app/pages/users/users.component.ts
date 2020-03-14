import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.users = new Array<User>();
    this.displayUserList();
  }

  public onDeleteClick():void{
    if(!confirm('Are you sure?')){
      this.router.navigate(['/Planets']);
    }
  }


  displayUserList(){
    this.userService.getList().subscribe(data => {

      if(data.success){
        this.users = data.userList;
      }else{
        console.log(data);
      }
    });
  }

}
