import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  #http = inject(HttpClient);

  getPlayer() {
    return this.#http.get('https://api.spotify.com/v1/me/player?market=TH', {
      headers: {
        "Authorization": `Bearer ${environment.accessToken}`,
      }
    })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}