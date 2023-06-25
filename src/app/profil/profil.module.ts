import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './Component/post/post.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { MenuProfilComponent } from './Component/menu-profil/menu-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesAnnoncesComponent } from './Component/mes-annonces/mes-annonces.component';
import { ChatComponent } from './Component/chat/chat.component';
import { MesAnnoncesEditComponent } from './Component/mes-annonces-edit/mes-annonces-edit.component';



@NgModule({
  declarations: [  
    PostComponent,
    MenuProfilComponent,
    MesAnnoncesComponent,
    ChatComponent,
    MesAnnoncesEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
   ProfilRoutingModule
  ]
})
export class ProfilModule { }
