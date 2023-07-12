import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-magic-link-admin',
  templateUrl: './magic-link-admin.component.html',
  styleUrls: ['./magic-link-admin.component.scss']
})
export class MagicLinkAdminComponent {
  email: string = '';

  constructor(private _Auth: AuthService) { }

  ngOnInit(): void {
  }

  async sendMagicLick () {
    try {
      await this._Auth.sendMagicLink(this.email, true);
    } catch (error) {
      console.log(error);
    }
  }

}
