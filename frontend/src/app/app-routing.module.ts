import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './modules/profile/components/profiles/profiles.component';
import { ProfileComponent } from './modules/profile/components/profile/profile.component';
import { CreateProfileComponent } from './modules/profile/components/create-profile/create-profile.component';
import { UpdateProfileComponent } from './modules/profile/components/update-profile/update-profile.component';
import { ProfileResolver } from './modules/profile/services/profile/profile-resolver.service';

const routes: Routes = [
  {
    path: 'profiles',
    component: ProfilesComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
  },
  {
    path: 'profile/:id/edit',
    component: UpdateProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
  },
  {
    path: 'create',
    component: CreateProfileComponent,
  },
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
