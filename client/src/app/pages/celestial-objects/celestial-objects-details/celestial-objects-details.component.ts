import { Component, OnInit } from '@angular/core';
import { CelestialObject } from 'src/app/model/celestial-object';
import { ActivatedRoute, Router } from '@angular/router';
import { CelestialObjectsService } from 'src/app/service/celestial-objects.service';



@Component({
  selector: 'app-celestial-objects-details',
  templateUrl: './celestial-objects-details.component.html',
  styleUrls: ['./celestial-objects-details.component.css']
})
export class CelestialObjectsDetailsComponent implements OnInit {

  title:string;
  celestialObject: CelestialObject;

  constructor(
    private activatedRoute: ActivatedRoute,
    private celestialObjectsService: CelestialObjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.celestialObject = new CelestialObject();

    this.activatedRoute.params.subscribe(params => {
      this.celestialObject._id = params.id;
    })

  }

  //! PLEASE PUT NOTES HERE
  public onDetailsSubmit():void{
    switch(this.title){
      case "Add Celestial Objects":
        this.celestialObjectsService.addCelestialObject(this.celestialObject).subscribe(data =>
          {
            if(data.success){
              this.router.navigate(['/CelestialObjects']);
            }else{
              this.router.navigate(['/SomethingElse']);
            }
          });
      break;
    }

  }

}
