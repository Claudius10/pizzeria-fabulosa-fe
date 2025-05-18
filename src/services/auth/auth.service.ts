import {Injectable, signal} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);
  loginDialogVisibility = signal(false);
  logoutDialogVisibility = signal(false);
  userId: number | null = null;
  userEmail: string | null = null;
  userName: string | null = null;
  userContactNumber: string | null = null;

  authenticate(token: string): boolean {
    const idToken = this.decode(token);

    if (idToken === null) {
      return false;
    }

    this.userId = Number(idToken.id);
    this.userEmail = idToken.sub!;
    this.userName = idToken.name;
    this.userContactNumber = idToken.contactNumber;
    this.isAuthenticated.set(true);
    return true;
  }

  logout() {
    this.userId = null;
    this.userEmail = null;
    this.userName = null;
    this.userContactNumber = null;
    this.isAuthenticated.set(false);
  }

  private decode(token: string): MyJwtPayload | null {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}

interface MyJwtPayload extends JwtPayload {
  id: string;
  name: string;
  contactNumber: string;
}
