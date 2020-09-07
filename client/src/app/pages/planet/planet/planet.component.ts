import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @Input() public deletingObject: Planet;
  @ViewChild('modalButton',null) modalButton;


  constructor(
    private plService: PlanetsService,
    private router:Router
  ) { }

  ngOnInit() {
   this.planets = new Array<Planet>();
   this.deletingObject = new Planet();
   this.displayPlanetList();
  }

  public onIdClick(item:Planet){
    this.deletingObject = item;
    console.log(this.deletingObject);
  }

  public onConfirmClick():void{
    this.router.navigate(['/Planets/delete/'+this.deletingObject._id]);
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