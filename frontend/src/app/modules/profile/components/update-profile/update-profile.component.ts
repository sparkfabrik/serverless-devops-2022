import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../../../models/profile';
import { SnackbarService } from '../../services/profile/snackbar.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  profile!: Profile;
  saving = false;
  private ngUnsubscribe = new Subject<void>();
  profileForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'];
    if (!this.profile) {
      return;
    }
    this.profileForm.patchValue(this.profile);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  update(): void {
    this.saving = true;
    const form = this.profileForm.value;
    this.profileService
      .updateProfile(this.profile.id, form)
      .pipe(
        finalize(() => this.saving = false),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (profile) => {
          this.snackbarService.openSnackBar('Profile updated!');
          this.router.navigate(['/profile', profile.id]);
        },
        error: (err) => {
          console.error(err);
          this.saving = false;
          this.snackbarService.openSnackBar('Failed to update profile!');
        }
      });
  }

}
