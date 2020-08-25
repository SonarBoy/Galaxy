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
import { PlanetDeleteComponent } from './pages/planet/planet-delete/planet-delete.component';
import { GalaxyDeleteComponent } from './pages/galaxy/galaxy-delete/galaxy-delete.component';
import { GalaxyDetailsComponent } from './pages/galaxy/galaxy-details/galaxy-details.component';
import { CelestialObjectsDetailsComponent } from './pages/celestial-objects/celestial-objects-details/celestial-objects-details.component';
import { CelestialObjectsDeleteComponent } from './pages/celestial-objects/celestial-objects-delete/celestial-objects-delete.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { UserDeleteComponent } from './pages/users/user-delete/user-delete.component';
import { AuthGuard } from './guards/auth.guard';
import { SelectionSortComponent } from './pages/selection-sort/selection-sort.component';
import { InsertionSortComponent } from './pages/insertion-sort/insertion-sort.component';
import { ShellSortComponent } from './pages/shell-sort/shell-sort.component';

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
    PlanetDetailsComponent,
    PlanetDeleteComponent,
    GalaxyDeleteComponent,
    GalaxyDetailsComponent,
    CelestialObjectsDetailsComponent,
    CelestialObjectsDeleteComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserDeleteComponent,
    SelectionSortComponent,
    InsertionSortComponent,
    ShellSortComponent
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
    })],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
