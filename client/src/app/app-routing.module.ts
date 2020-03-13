import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './util/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './util/home/home.component';
import { ProjectsComponent } from './util/projects/projects.component';
import { FunctionsComponent } from './util/functions/functions.component';
import { ErrorComponent } from './util/error/error.component';
import { PlanetComponent } from './pages/planet/planet/planet.component'
import { GalaxyComponent } from './pages/galaxy/galaxy/galaxy.component';
import { CelestialObjectsComponent } from './pages/celestial-objects/celestial-objects.component';
import { GalaxyDetailsComponent } from './pages/galaxy/galaxy-details/galaxy-details.component';
import { GalaxyDeleteComponent } from './pages/galaxy/galaxy-delete/galaxy-delete.component';
import { PlanetDetailsComponent } from './pages/planet/planet-details/planet-details.component';
import { CelestialObjectsDetailsComponent } from './pages/celestial-objects/celestial-objects-details/celestial-objects-details.component';
import { CelestialObjectsDeleteComponent } from './pages/celestial-objects/celestial-objects-delete/celestial-objects-delete.component';


const routes: Routes = [
  {path:'About',component:AboutComponent,data:{title:'About'}},
  {path:'Projects',component:ProjectsComponent,data:{title:'Projects'}},
  {path:'Functions',component:FunctionsComponent,data:{title:'Functions'}},
  {path:'Home',component:HomeComponent,data:{title:'Home'}},
  {path:'',component:HomeComponent,data:{title:'Home'}},
  
  //Planets
  {path:'Planets',component:PlanetComponent,data:{title:'Planets'}},
  {path:'Planets/add',component:PlanetDetailsComponent,data:{title:'Planets'}},


  {path:'Galaxies',component:GalaxyComponent,data:{title:'Galaxies'}},
  {path:'Galaxies/add',component:GalaxyDetailsComponent,data:{title:'Add Galaxy'}},
  {path:'Galaxies/edit/:id',component:GalaxyDetailsComponent,data:{title:'Edit Galaxy'}},
  {path:'Galaxies/delete/:id',component:GalaxyDeleteComponent,data:{title:'Delete Galaxy'}},


  {path:'CelestialObjects',component:CelestialObjectsComponent,data:{title:'CelestialObjects'}},
  {path:'CelestialObjects/add',component:CelestialObjectsDetailsComponent,data:{title:'Add Celestial Objects'}},
  {path:'CelestialObjects/edit/:id',component:CelestialObjectsDetailsComponent,data:{title:'Edit Celestial Objects'}},
  {path:'CelestialObjects/delete/:id',component:CelestialObjectsDeleteComponent,data:{title:'Delete Celestial Objects'}},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// enableTracing: true, // <-- debugging purposes only
export class AppRoutingModule { }
