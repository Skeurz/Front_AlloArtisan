import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/modeles/user';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roleForm !:FormGroup;
  user!:User;
  selectedRole: string;




  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthentificationServiceService) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      roleName: [null, Validators.required],
      
    })
    this.getUser();
  }

  
  getUser(){
    const userNameUser =this.route.snapshot.params['userName'];
    this.service.getUserByUserName(userNameUser).subscribe(
      data=>{
        this.user=data;
        }
    );
  }
  
  

  
  
  
  
  
  
  
  
  addRoleToUser(userName: string, roleName: string): void {
    
    this.service.addRoleToUser(userName, roleName).subscribe(
      () => {
        // Handle success if needed
        console.log('Role added successfully');
        alertifyjs.set('notifier','position', 'bottom-center');
        alertifyjs.success('Rôle ajouté !');
        this.router.navigateByUrl('login');

      },
      (error) => {
        // Handle error if needed
        console.error('Error adding role:', error);
        alertifyjs.set('notifier','position', 'bottom-center');
        alertifyjs.error('Erreur');
      }
    );
  }

/*  onAddRole(){
    this.service.addRoleToUser(this.roleForm.value).subscribe();
    this.router.navigateByUrl(`/profil/${this.user.userName}`);

  }*/

}
