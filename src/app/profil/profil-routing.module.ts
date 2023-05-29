import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostComponent } from "./Component/post/post.component";
import { MenuProfilComponent } from "./Component/menu-profil/menu-profil.component";


const routes: Routes = [

    {path :'',component: MenuProfilComponent },
   {path :'post',component: PostComponent },
    //{path :'myProfil',component:ProfilComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfilRoutingModule { }