import { Component, OnInit } from '@angular/core';
import { Galaxy } from 'src/app/model/galaxy';
import { GalaxyService } from 'src/app/service/galaxy.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css']
})
export class GalaxyComponent implements OnInit {

  galaxy: Galaxy[];

  constructor(
    private galaxyService: GalaxyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.galaxy = new Array<Galaxy>();
    this.displayGalaxyList();
  }

  displayGalaxyList(){
    this.galaxyService.getGalaxyList().subscribe(data =>{
      
      if(data.success){
        console.log(data);
        this.galaxy = data.galaxyList;
      }else{
        this.galaxy = null;
      }
    });
  }

}
