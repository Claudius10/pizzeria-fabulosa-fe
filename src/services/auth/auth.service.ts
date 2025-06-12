import {Injectable, signal} from '@angular/core';
import {UserInfoDTO} from '../../api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);
  loginDialogVisibility = signal(false);
  logoutDialogVisibility = signal(false);
  id: number | null = null;
  email: string | null = null;
  name: string | null = null;
  phoneNumber: string | null = null;
  address: string | null = null;

  authenticate(userInfo: UserInfoDTO): boolean {
    if (userInfo === null) {
      return false;
    }

    this.id = Number(userInfo.id);
    this.email = userInfo.email;
    this.name = userInfo.name;
    this.phoneNumber = userInfo.phone_number;
    this.address = userInfo.address;
    this.isAuthenticated.set(true);
    return true;
  }

  logout() {
    this.id = null;
    this.email = null;
    this.name = null;
    this.phoneNumber = null;
    this.address = null;
    this.isAuthenticated.set(false);
  }
}
