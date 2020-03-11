import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

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
import { GalaxyComponent } from './pages/galaxy/galaxy/galaxy.component'
import { PlanetComponent } from './pages/planet/planet/planet.component';
import { CelestialObjectsComponent } from './pages/celestial-objects/celestial-objects.component';
import { PlanetDetailsComponent } from './pages/planet/planet-details/planet-details.component';

//import { AuthGuard } from './guards/auth.guard';
/* *
 * HttpClientModule = Configures the dependency injector for HttpClient with 
 * supporting services for XSRF. Automatically imported by HttpClientModule.
 * NOTE: Services will throw out error if not imported.
 * 
 * "Uncaught (in promise): NullInjectorError: StaticInjectorError(AppModule)[HttpClient]: 
 * StaticInjectorError(Platform: core)[HttpClient]: 
 * NullInjectorError: No provider for HttpClient!
 * 
*/

export function jwtTokenGetter(){
  return localStorage.getItem('id_token');
}


JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })

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
    CelestialObjectsComponent,
    PlanetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
