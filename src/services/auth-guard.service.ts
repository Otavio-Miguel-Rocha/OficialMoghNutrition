
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { NutricionistaService } from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private nutricionistaService: NutricionistaService, private router: Router) {}
    //state 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.nutricionistaService.getLoggedUser()) {
          return true;
        } else {
          this.router.navigate(["/Menu-Inicial"]);
          return false;
        }
      }
}