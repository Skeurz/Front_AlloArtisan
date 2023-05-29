import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ListBesoinsComponent } from './components/list-besoins/list-besoins.component';
import { PassoublieComponent } from './components/passoublie/passoublie.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';




const routes: Routes = [
  {path :'',component: HomeComponent},
  {path :'passoublie',component: PassoublieComponent},
  {path :'contact',component: ContactComponent },
  {path :'authentifier',component: InscriptionFormComponent},
  {path :'artisans',component: ArtisanListComponent},
  {path :'service',component: ListServiceComponent},
  {path :'besoin',component: ListBesoinsComponent},
  {path :'admin',component: AdminPageComponent},
  {path :'admin/edit', component: AdminEditComponent},
  {path :'login',component: LoginComponent},
  {path :'login/user', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) } 
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
