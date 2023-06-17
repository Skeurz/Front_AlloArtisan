import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ListArtisanService } from './core/services/list-artisan.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


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
    return this.router.parseUrl('/404'); 
  }
  
  setAccessedByButton(accessed: boolean): void {
    this.isAccessedByButton = accessed;
  }
}
