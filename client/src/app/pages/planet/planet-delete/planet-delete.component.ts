import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/model/planet';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsService } from 'src/app/service/planets.service';


@Component({
  selector: 'app-planet-delete',
  templateUrl: './planet-delete.component.html',
  styleUrls: ['./planet-delete.component.css']
})
export class PlanetDeleteComponent implements OnInit {

  title:string;
  planet: Planet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planetListService: PlanetsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.planet = new Planet();

    this.activatedRoute.params.subscribe(params => {
      this.planet._id = params.id;
    });


    this.deletePlanet(this.planet);
  }

  

  private deletePlanet(deletingPlanet: Planet): void{
    this.planetListService.deletePlanet(deletingPlanet).subscribe(data => {
      if(data.success){
        this.router.navigate(['/Planets']);
      }else{
        this.router.navigate(['/SomethingElse']);
      }
    })
  }

}
