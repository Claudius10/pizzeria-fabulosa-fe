import {Injectable, signal} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId = "0";
  private userEmail = signal<string>("quijote@gmail.com");
  private userName = signal<string>("Cervantes");
  private userContactNumber = signal<string>("000 000 000");
  private isAuthenticated = signal(false);
  private loginDialog = signal(false);
  private logoutPopup = signal(false);

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
    this.userId = "0";
    this.userEmail.set("quijote@gmail.com");
    this.userName.set("Cervantes");
    this.userContactNumber.set("000 000 000");
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

  public getLogoutPopup() {
    return this.logoutPopup.asReadonly();
  }

  public setLogoutPopup(value: boolean) {
    this.logoutPopup.set(value);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated.asReadonly();
  }

  public getUserEmail() {
    return this.userEmail.asReadonly();
  }

  public getUserName() {
    return this.userName.asReadonly();
  }

  public getUserContactNumber() {
    return this.userContactNumber.asReadonly();
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
