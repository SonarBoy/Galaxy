import { Component, OnInit } from '@angular/core';
import { Galaxy } from 'src/app/model/galaxy';
import { ActivatedRoute, Router } from '@angular/router';
import { GalaxyService } from 'src/app/service/galaxy.service';

@Component({
  selector: 'app-galaxy-delete',
  templateUrl: './galaxy-delete.component.html',
  styleUrls: ['./galaxy-delete.component.css']
})
export class GalaxyDeleteComponent implements OnInit {

  title:string;
  galaxy: Galaxy;


  constructor(
    private activatedRoute: ActivatedRoute,
    private galaxyListService: GalaxyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.galaxy = new Galaxy();

    this.activatedRoute.params.subscribe(params =>{
      this.galaxy._id = params.id;
    });

    this.deleteGalaxy(this.galaxy);
  }


  private deleteGalaxy(deletingGalaxy: Galaxy): void{
    this.galaxyListService.deleteGalaxy(deletingGalaxy).subscribe(data =>{
      if(data.success){
        this.router.navigate(['/Galaxies']);
      }else{
        this.router.navigate(['/Home']);
      }
    })
  }

}
