import {Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  loginDialog = false;
  logoutDialog = false;
  userId: string | null = null;
  userEmail: string | null = null;
  userName: string | null = null;
  userContactNumber: string | null = null;

  setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userId = idToken.id;
      this.userEmail = idToken.sub!;
      this.userName = idToken.name;
      this.userContactNumber = idToken.contactNumber;
      this.isAuthenticated = true;
    }
  }

  logout() {
    this.userId = null;
    this.userEmail = null;
    this.userName = null;
    this.userContactNumber = null;
    this.isAuthenticated = false;
  }

  setLoginDialog(value: boolean) {
    this.loginDialog = value;
  }

  setLogoutDialog(value: boolean) {
    this.logoutDialog = value;
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
