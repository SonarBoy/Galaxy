import { Component, OnInit } from '@angular/core';
import { Galaxy } from 'src/app/model/galaxy';
import { ActivatedRoute, Router } from '@angular/router';
import { GalaxyService} from 'src/app/service/galaxy.service';



@Component({
  selector: 'app-galaxy-details',
  templateUrl: './galaxy-details.component.html',
  styleUrls: ['./galaxy-details.component.css']
})
export class GalaxyDetailsComponent implements OnInit {


  title: string;
  galaxy: Galaxy;

  constructor(
    private activatedRoute: ActivatedRoute,
    private galaxyListService: GalaxyService,
    private router: Router
  ) { }

  ngOnInit() {

    //! PLEASE PUT NOTES HERE
    this.title = this.activatedRoute.snapshot.data.title;
    this.galaxy = new Galaxy();

    //! PLEASE PUT NOTES HERE
    this.activatedRoute.params.subscribe(params => {
      this.galaxy._id = params.id;
    })

    //! PLEASE PUT NOTES HERE
    if (this.title === 'Edit Galaxy') {
      this.getGalaxy(this.galaxy);
      console.log(this.galaxy);
    }
    
  }

  //! PLEASE PUT NOTES HERE
  private getGalaxy(galaxyGet: Galaxy): void{
    this.galaxyListService.getGalaxy(galaxyGet).subscribe(data => {
      this.galaxy = data.galaxy;
    });
  }

  public onTestNavigate():void{
    this.router.navigate(['Galaxies']);
  }

  public onDetailsSubmit():void{

    //! PLEASE PUT NOTES HERE
    /* *
     * An Observable instance begins publishing values only when someone 
     * subscribes to it. You subscribe by calling the subscribe() method \
     * of the instance, passing an observer object to receive the notifications.
     */
    switch(this.title){
      case "Add Galaxy":
        this.galaxyListService.addGalaxy(this.galaxy).subscribe(data =>
        {
          
          if(data.success){  
            console.log(data.success);
            this.router.navigate(['/Galaxies']);
          }else{
            this.router.navigate(['/SomethingElse']);
          }

        });
      break;
        
      case "Edit Galaxy":
        this.galaxyListService.postEditGalaxy(this.galaxy).subscribe(data => {

          if(data.success){  
            console.log(data.success);
            this.router.navigate(['/Galaxies']);
          }else{
            this.router.navigate(['/SomethingElse']);
          }

        })
        
      break;
    }
  }

}

/* *
 * Provides access to information about a route associated with a 
 * component that is loaded in an outlet. Use to traverse the 
 * RouterState tree and extract information from nodes.
 * 
 * interface ActivatedRoute {
 * snapshot: ActivatedRouteSnapshot
 * url: Observable<UrlSegment[]>
 * params: Observable<Params>
 * queryParams: Observable<Params>
 * fragment: Observable<string>
 * data: Observable<Data>
 * outlet: string
 * component: Type<any> | string | null
 * routeConfig: Route | null
 * root: ActivatedRoute
 * parent: ActivatedRoute | null
 * firstChild: ActivatedRoute | null
 * children: ActivatedRoute[]
 * pathFromRoot: ActivatedRoute[]
 * paramMap: Observable<ParamMap>
 * queryParamMap: Observable<ParamMap>
 * toString(): string
}   
 * 
 * 
 * 
 */
