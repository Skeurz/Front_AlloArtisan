import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ListArtisanService } from './core/services/list-artisan.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';









/* Guard qui empêche l'accès à /admin et la rend uniquement accessible
 par bouton dans le profil des comptes admin */

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private isAccessedByButton: boolean = false;

  
  constructor(private authService: ListArtisanService, private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.isAccessedByButton) {
      return true;
    }
    if (performance && performance.navigation.type === PerformanceNavigation.TYPE_RELOAD) {
      return true; // Permet l'actualisation de la page.
    }
    return this.router.parseUrl('/404'); 
  }
  
  setAccessedByButton(accessed: boolean): void {
    this.isAccessedByButton = accessed;
  }
}
