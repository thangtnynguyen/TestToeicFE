// import { CanActivateFn } from '@angular/router';

// export const canDeactivateGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { Injectable } from '@angular/core';
// import { CanDeactivate } from '@angular/router';
// import { Observable } from 'rxjs';

// export interface ComponentCanDeactivate {
// 	canDeactivate: () => boolean | Observable<boolean>;
// }

// @Injectable({
// 	providedIn: 'root'
// })
// export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
// 	canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
// 		return component.canDeactivate ? component.canDeactivate() : true;
// 	}
// }



import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
