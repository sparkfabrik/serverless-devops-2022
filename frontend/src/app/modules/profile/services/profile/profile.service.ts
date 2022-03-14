import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Profile } from '../../../../models/profile';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) { }

  listPublicProfiles(): Observable<{ data: Profile[] }> {
    return this.http.get<{ data: Profile[] }>(`${environment.apiBaseUrl}/profile/list`);
  }

  getPublicProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiBaseUrl}/profile/${id}`);
  }

  createProfile(body: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.apiBaseUrl}/profile`, body);
  }

  updateProfile(id: string, body: object): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiBaseUrl}/profile/${id}`, body);
  }

  deleteProfile(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/profile/${id}`);
  }

  getSignedUrl(fileName: string): Promise<string> {
    return firstValueFrom(this.http.get<string>(`${environment.apiBaseUrl}/get-signed-url?key=${fileName}`))
  }

  uploadFile(fileSignedUrl: string, file: any): Observable<object> {
    return this.http.put(fileSignedUrl, file);
  }

}
