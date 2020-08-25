import { Component, OnInit } from '@angular/core';
import { CelestialObject } from 'src/app/model/celestial-object';
import { CelestialObjectsService } from 'src/app/service/celestial-objects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-celestial-objects-delete',
  templateUrl: './celestial-objects-delete.component.html',
  styleUrls: ['./celestial-objects-delete.component.css']
})
export class CelestialObjectsDeleteComponent implements OnInit {

  title:string;
  celestialObject: CelestialObject
  constructor(
    private activatedRoute: ActivatedRoute,
    private celestialObjectService: CelestialObjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.celestialObject = new CelestialObject();

    this.activatedRoute.params.subscribe(params =>{
      this.celestialObject._id = params.id;
    });

    this.deleteCelestialObject(this.celestialObject);
  }

  private deleteCelestialObject(deletingCelestialObject: CelestialObject): void{
    this.celestialObjectService.deleteCelestialObject(deletingCelestialObject).subscribe(data => {
      if(data.success){
        this.router.navigate(['/CelestialObjects']);
      }else{
        this.router.navigate(['/error']);
        alert(data.error);
      }
    });
  }

}
