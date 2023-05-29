import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './Component/post/post.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { MenuProfilComponent } from './Component/menu-profil/menu-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [  
    PostComponent,
    MenuProfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
   ProfilRoutingModule
  ]
})
export class ProfilModule { }
