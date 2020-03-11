import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CelestialObject} from 'src/app/model/celestial-object'



@Component({
  selector: 'app-celestial-objects',
  templateUrl: './celestial-objects.component.html',
  styleUrls: ['./celestial-objects.component.css']
})
export class CelestialObjectsComponent implements OnInit {

  celestialObject: CelestialObject;

  constructor(
  ) { }

  ngOnInit() {

  }

  displayObjectList(){

  }

}
