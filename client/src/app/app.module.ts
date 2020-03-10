import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './util/home/home.component';
import { AboutComponent } from './util/about/about.component';
import { ProjectsComponent } from './util/projects/projects.component';
import { ErrorComponent } from './util/error/error.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';

//import {AuthService} from './services/auth.service';
import {JwtModule,JwtHelperService, JwtInterceptor} from '@auth0/angular-jwt';
import { FunctionsComponent } from './util/functions/functions.component';
import { GalaxyComponent } from './galaxy/galaxy/galaxy.component';
import { PlanetComponent } from './planet/planet/planet.component';
//import { AuthGuard } from './guards/auth.guard';

export function jwtTokenGetter(){
  return localStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    FunctionsComponent,
    GalaxyComponent,
    PlanetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
