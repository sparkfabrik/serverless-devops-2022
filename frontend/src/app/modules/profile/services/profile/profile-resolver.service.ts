
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { Profile } from 'src/app/models/profile';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
    const id = route.paramMap.get('id') || '';
    return this.profileService
      .getPublicProfile(id)
      .pipe(
        map(item => item),
        catchError(err => {
          this.router.navigate(['404']);
          console.error(err);
          throw err;
        })
      );
  }
}
