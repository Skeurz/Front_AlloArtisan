import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';
import { ArtisanComponent } from './components/artisan/artisan.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './components/login/login.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ListBesoinsComponent } from './components/list-besoins/list-besoins.component';
import { OffreComponent } from './components/offre/offre.component';
import { PassoublieComponent } from './components/passoublie/passoublie.component';
import { AuthentificationServiceService } from './core/services/authentification-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AdminListeOffresBesoinsComponent } from './components/admin-liste-offres-besoins/admin-liste-offres-besoins.component';
import { Back2TopComponent } from './components/back2-top/back2-top.component';
import { RoleComponent } from './components/role/role.component';
import { AdminReclamationComponent } from './components/admin-reclamation/admin-reclamation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisanListComponent,
    ArtisanComponent,
    InscriptionFormComponent,
    ContactComponent,
    LoginComponent,
    ListServiceComponent,
    ListBesoinsComponent,
    OffreComponent,
    PassoublieComponent,
    AdminPageComponent,
    AdminEditComponent,
    AdminListeOffresBesoinsComponent,
    Back2TopComponent,
    RoleComponent,
    AdminReclamationComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    RouterModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['http://localhost:4200/'], 
        disallowedRoutes: ['http://localhost:4200/login'], 
      },
    }),

  ],
  providers: [AuthentificationServiceService, JwtHelperService,],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
