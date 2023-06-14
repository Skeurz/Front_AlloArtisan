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
import { AdminListeOffresBesoinsComponent } from './components/admin-liste-offres-besoins/admin-liste-offres-besoins.component';
import { RoleComponent } from './components/role/role.component';
import { AdminReclamationComponent } from './components/admin-reclamation/admin-reclamation.component';



// Pour ajouter une route il s'agirait d'importer d'abords le composant puis ajouter sa route ci-dessous
const routes: Routes = [
  {path :'',component: HomeComponent},
  {path :'passoublie',component: PassoublieComponent},
  {path :'contact',component: ContactComponent },
  {path :'authentifier',component: InscriptionFormComponent},
  {path :'artisans',component: ArtisanListComponent},
  {path :'service',component: ListServiceComponent},
  {path :'besoin',component: ListBesoinsComponent},
  {path :'admin/users',component: AdminPageComponent},
  {path :'admin/reclamations', component: AdminReclamationComponent},
  {path :'admin/posts', component: AdminListeOffresBesoinsComponent},
 // {path :'admin/edit', component: AdminEditComponent},
  {path :'login',component: LoginComponent},
  {path :'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },
  {path :'role/:userName',component: RoleComponent},
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
