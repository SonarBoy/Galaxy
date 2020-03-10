import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './util/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './util/home/home.component';
import { ProjectsComponent } from './util/projects/projects.component';
import { FunctionsComponent } from './util/functions/functions.component';
import { ErrorComponent } from './util/error/error.component';
import { PlanetComponent } from './planet/planet/planet.component';
import { GalaxyComponent } from './galaxy/galaxy/galaxy.component';

const routes: Routes = [
  {path:'About',component:AboutComponent,data:{title:'About'}},
  {path:'Projects',component:ProjectsComponent,data:{title:'Projects'}},
  {path:'Functions',component:FunctionsComponent,data:{title:'Functions'}},
  {path:'Home',component:HomeComponent,data:{title:'Home'}},
  {path:'',component:HomeComponent,data:{title:'Home'}},
  
  //Planets
  {path:'Planets',component:PlanetComponent,data:{title:'Planets'}},
  {path:'Galaxies',component:GalaxyComponent,data:{title:'Galaxies'}},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
