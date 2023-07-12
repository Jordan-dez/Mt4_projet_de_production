import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient, private _Global: GlobalService) { }


  async sendMagicLink(email: string, isAdministrator: boolean) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      let url = '';

      if (isAdministrator) {
        url = `${this._Global.baseUrl}/auth/magic-link-admin`;
      } else {
        url = `${this._Global.baseUrl}/auth/magic-link-student`;
      }

      const observable = this.Http.get(`${this._Global.baseUrl}/auth/magic-link-admin?email=${encodeURI(email)}`, { headers });
      
      observable.subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
          throw error;
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async loginWithToken(token: string) {
    try {

      const headers = {
        'Content-Type': 'application/json'
      };

      const observable = this.Http.get(`${this._Global.baseUrl}/auth/login?token=${encodeURI(token)}`, { headers });

      observable.subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
          throw error;
        }
      );
    } catch (error) {
      throw error;
    }

  }

}
