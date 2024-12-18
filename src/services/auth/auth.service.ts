import {Injectable, signal} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;
  private userEmail = signal<string | null>(null);
  private userName = signal<string | null>(null);
  private userContactNumber = signal<string | null>(null);
  public isAuthenticated = signal(false);
  private loginDialog = signal(false);
  private logoutDialog = signal(false);

  public setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userId = idToken.id;
      this.userEmail.set(idToken.sub!);
      this.userName.set(idToken.name);
      this.userContactNumber.set(idToken.contactNumber);
      this.isAuthenticated.set(true);
    }
  }

  public logout() {
    this.userId = null;
    this.userEmail.set(null);
    this.userName.set(null);
    this.userContactNumber.set(null);
    this.isAuthenticated.set(false);
  }

  public getLoginDialog() {
    return this.loginDialog.asReadonly();
  }

  public getIsLoginDialogVisible() {
    return this.loginDialog();
  }

  public setLoginDialog(value: boolean) {
    this.loginDialog.set(value);
  }

  public getLogoutDialog() {
    return this.logoutDialog.asReadonly();
  }

  public getIsLogoutDialogVisible() {
    return this.logoutDialog();
  }

  public setLogoutDialog(value: boolean) {
    this.logoutDialog.set(value);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated.asReadonly();
  }

  public getUserEmail() {
    return this.userEmail();
  }

  public getUserName() {
    return this.userName();
  }

  public getUserContactNumber() {
    return this.userContactNumber();
  }

  public getUserId() {
    return this.userId;
  }

  private decode(token: string): MyJwtPayload | null {
    try {
      return jwtDecode(token);
    } catch (invalidTokenError) {
      console.log(invalidTokenError);
      return null;
    }
  }
}

interface MyJwtPayload extends JwtPayload {
  id: string;
  name: string;
  contactNumber: string;
}
