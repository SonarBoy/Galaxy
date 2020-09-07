import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/model/planet';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsService } from 'src/app/service/planets.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  title:string;
  planets: Planet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planetListService: PlanetsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.planets = new Planet();

    this.activatedRoute.params.subscribe(params => {
      this.planets._id = params.id;
    });


    if(this.title === 'Edit Planet'){
      this.getPlanet(this.planets);
    }

  }

  private getPlanet(getPlanet: Planet): void{
    this.planetListService.getPlanet(getPlanet).subscribe(data => {
      this.planets = data.planet;
    });
  }

  public onTestNavigate(){
    this.router.navigate(['/Planets']);
  }

  public onDetailsSubmit(): void{
    switch(this.title){
      case "Add Planet":
        this.planetListService.addPlanet(this.planets).subscribe(data => 
        {

          if(data.success){
            this.router.navigate(['/Planets']);
          }else{
            this.router.navigate(['/SomethingElse']);
          }

        });
      break;

      case "Edit Planet" :
        this.planetListService.postEditPlanet(this.planets).subscribe(data => 
          {
  
            if(data.success){
              this.router.navigate(['/Planets']);
            }else{
              this.router.navigate(['/SomethingElse']);
            }
  
          });
      break;
    }
  }


 
}
