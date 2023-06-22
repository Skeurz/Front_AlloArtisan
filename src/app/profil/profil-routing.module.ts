import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostComponent } from "./Component/post/post.component";
import { MenuProfilComponent } from "./Component/menu-profil/menu-profil.component";
import { MesAnnoncesComponent } from "./Component/mes-annonces/mes-annonces.component";
import { ChatComponent } from "./Component/chat/chat.component";



const routes: Routes = [

    {path :'',component: MenuProfilComponent },
    {path :'post',component: PostComponent },
    {path :'mes-annonces',component: MesAnnoncesComponent },
    {path :'chat',component: ChatComponent },


   

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfilRoutingModule { }