import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MagicLinkResponse } from './magic-link-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static MAGIC_LINK_API_URL = `${environment.apiBase}/auth/magic_link`;

  constructor(private http: HttpClient) {}

  createMagicLink(
    id: string,
    meta: Record<any, any> = {},
  ): Observable<MagicLinkResponse> {
    return this.http.post<MagicLinkResponse>(
      `${AuthService.MAGIC_LINK_API_URL}/${id}`,
      {
        client_id: environment.auth.client_id,
        client_secret: environment.auth.client_secret,
        meta,
        scope: 'magic_link',
      },
    );
  }
}
