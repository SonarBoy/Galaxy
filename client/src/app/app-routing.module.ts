import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './util/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './util/home/home.component';
import { ProjectsComponent } from './util/projects/projects.component';
import { FunctionsComponent } from './util/functions/functions.component';
import { ErrorComponent } from './util/error/error.component';

const routes: Routes = [
  {path:'About',component:AboutComponent,data:{title:'About'}},
  {path:'Home',component:HomeComponent,data:{title:'Home'}},
  {path:'',component:HomeComponent,data:{title:'Home'}},
  {path:'Projects',component:ProjectsComponent,data:{title:'Projects'}},
  {path:'Functions',component:FunctionsComponent,data:{title:'Functions'}},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
