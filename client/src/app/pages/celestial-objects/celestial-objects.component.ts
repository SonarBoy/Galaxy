import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() public deletingObject: CelestialObject;
  @ViewChild('modalButton',null) modalButton;

  constructor(
    private celestialObjectService: CelestialObjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.celestialObjects = new Array<CelestialObject>();
    this.deletingObject = null;
    this.displayObjectList();
  }

  public onDeleteClick():void{
    if(!confirm('Are you sure?')){
      this.router.navigate(['/CelestialObjects']);
    }
  }

  public onIdClick(item:CelestialObject){
    this.deletingObject = item;
    //alert(this.deletingObject._id);
  }

  public onConfirmClick():void{
    this.router.navigate(['/CelestialObjects/delete/'+this.deletingObject._id]);
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
