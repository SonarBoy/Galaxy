import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CelestialObject} from 'src/app/model/celestial-object'
import {CelestialObjectsService} from 'src/app/service/celestial-objects.service'


@Component({
  selector: 'app-celestial-objects',
  templateUrl: './celestial-objects.component.html',
  styleUrls: ['./celestial-objects.component.css']
})
export class CelestialObjectsComponent implements OnInit {

  celestialObjects: CelestialObject[];

  constructor(
    private celestialObjectService: CelestialObjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.celestialObjects = new Array<CelestialObject>();
    this.displayObjectList();
  }

  displayObjectList(){
    this.celestialObjectService.getCelestialObjectsList().subscribe(data =>{
      
      if(data.success){
        console.log(data);
        this.celestialObjects = data.celestialObjectList;
      }else{
        this.celestialObjects = null;
      }
    });
  }

}
