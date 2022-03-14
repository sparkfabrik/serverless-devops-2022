import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';
import { SnackbarService } from '../../services/profile/snackbar.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile!: Profile;
  loading = true;
  saving = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'];
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  delete(): void {
    if (!this.profile) {
      return
    }
    this.saving = true;
    this.profileService
      .deleteProfile(this.profile.id)
      .pipe(
        finalize(() => this.saving = false),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        complete: () => {
          this.snackbarService.openSnackBar('Profile deleted!');
          this.router.navigate(['/profiles']);
        },
        error: (err) => {
          console.error(err);
          this.saving = false;
          this.snackbarService.openSnackBar('Failed to delete profile!');
        }
      });
  }

}
