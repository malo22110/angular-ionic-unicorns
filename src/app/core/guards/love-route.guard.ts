import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CoreServiceModule } from '../core-service.module';
import { UnicornService } from '../services/unicorns.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Unicorn } from '../models/unicorn.model';

@Injectable({
  providedIn: CoreServiceModule
})
export class LoveRouteGuard implements CanActivateChild, CanActivate {

  constructor(
    private readonly unicornService: UnicornService,
    private readonly router: Router
  ) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<UrlTree | boolean> {
    return this.unicornService.getAllUnicorns().pipe(
      map((unicorns: Unicorn[]) => {
        if (unicorns && this.unicornService.atLeastOneMaleAndOneFemale(unicorns)) {
          return true;
        }
        return this.router.createUrlTree(['/', 'home']);
      }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
    return this.canActivate(childRoute, state);
  }

}
