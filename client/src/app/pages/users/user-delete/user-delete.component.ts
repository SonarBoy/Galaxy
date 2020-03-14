import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute , Router} from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  title:string;
  user: User;

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

    this.deleteUser(this.user);
  }


  private deleteUser(deleteUser: User): void{
    this.userService.deleteUser(deleteUser).subscribe(data => {

      if(data.success){
        this.router.navigate(['/Users']);
      }else{
        this.router.navigate(['/Users']);
        console.log(data);
      }
      
    });
  }

}
