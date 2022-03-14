import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Profile } from '../../../../models/profile';
import { SnackbarService } from '../../services/profile/snackbar.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit, OnDestroy {
  profiles!: Profile[];
  loading = true;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadProfiles(): void {
    this.profileService
      .listPublicProfiles()
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (response: { data: Profile[] }) => this.profiles = response.data,
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.snackbarService.openSnackBar('Failed to get profiles!');
        }
      });
  }

}
