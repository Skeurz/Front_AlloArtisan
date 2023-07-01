import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationServiceService } from './core/services/authentification-service.service';






/* Guard qui empêche les utilisateurs non connectés à acceder à /profil et tous ses childs par exemple (/profil/post)
et qui empêche aussi les utilisateurs connectés  à acceder à /login et /authentifier */







@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  constructor(private router: Router, private authService: AuthentificationServiceService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login' || state.url === '/authentifier'  || state.url === '/pre-confirm') {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/profil']); /* Si l'utilisateur est connecté et essaye d'acceder a la page login 
        ou inscription il va se rediriger vers sa page profil */
        return false; // Bloque l'accès
      } else {
        return true; // Permet l'accès
      }

    } 
    else {
      if (this.authService.isLoggedIn()) {
        return true; 
      } else {
        this.router.navigate(['/login']); /* Redirige les utilisateurs non connecté à l'interface de 
        connexion s'ils essayent d'acceder a /profil */

        return false; // Bloque l'accès
      }
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  
}
