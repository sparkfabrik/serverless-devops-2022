import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Profile } from '../../../../models/profile';
import { SnackbarService } from '../../services/profile/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  profile!: Profile;
  saving = false;
  private ngUnsubscribe = new Subject<void>();
  file!: File;
  profileForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
    });
  }

  save(): void {
    this.saving = true;
    const form = this.profileForm.value;
    this.saving = true;
    this.profileService
      .createProfile(form)
      .pipe(
        finalize(() => this.saving = false),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (profile: Profile) => {
          this.snackbarService.openSnackBar('Profile created!');
          this.router.navigate(['/profile', profile.id]);
        },
        error: (err) => {
          console.error(err);
          this.saving = false;
          this.snackbarService.openSnackBar('Failed to create profile!');
        }
      });
  }

  fileLoad(event: any): void {
    if (event?.target?.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  async uploadFile(): Promise<void> {
    this.saving = true;
    let fileuploadurl;
    try {
      fileuploadurl = await this.profileService.getSignedUrl(this.file!.name);
    } catch (err) {
      console.error(err);
      this.saving = false;
      this.snackbarService.openSnackBar('Failed to upload file!');
      return;
    }
    this.profileService
      .uploadFile(fileuploadurl, this.file)
      .pipe(
        finalize(() => this.saving = false),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        complete: () => {
          this.snackbarService.openSnackBar('File uploaded!');
          this.fileInput.nativeElement.value = '';
          this.router.navigate(['/profiles']);
        },
        error: (err) => {
          console.error(err);
          this.saving = false;
          this.snackbarService.openSnackBar('Failed to upload file!')
        },
      });
  }

}
