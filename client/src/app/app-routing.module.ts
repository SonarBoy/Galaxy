import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './util/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './util/home/home.component';
import { ProjectsComponent } from './util/projects/projects.component';

const routes: Routes = [
  {path:'About',component:AboutComponent,data:{title:'About'}},
  {path:'Home',component:HomeComponent,data:{title:'Home'}},
  {path:'Projects',component:ProjectsComponent,data:{title:'Projects'}},
  {path:'Functions',component:HomeComponent,data:{title:'Functions'}},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
