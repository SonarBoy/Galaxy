import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Planet } from 'src/app/model/planet';
import {PlanetsService} from 'src/app/service/planets.service'



@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planets: Planet[];

  constructor(
    private plService: PlanetsService,
    private router:Router
  ) { }

  ngOnInit() {
   this.planets = new Array<Planet>();
   this.displayPlanetList();
  }

  public onDeleteClick():void{
    if(!confirm('Are you sure?')){
      this.router.navigate(['/Planets']);
    }
  }

  displayPlanetList(){
    this.plService.getPlanetList().subscribe(data => {

      if(data.success){
        console.log(data);
        this.planets = data.planetList;
      }else{
        this.planets = null;
      }
    });
  }


}