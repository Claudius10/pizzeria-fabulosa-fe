import {Injectable, signal} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | undefined = undefined;
  private userEmail = signal<string | undefined>(undefined);
  private userName = signal<string | undefined>(undefined);
  private userContactNumber = signal<string | undefined>(undefined);
  private isAuthenticated = signal(false);

  public setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userId = idToken.id;
      this.userEmail.set(idToken.sub);
      this.userName.set(idToken.name);
      this.userContactNumber.set(idToken.contactNumber);
      this.isAuthenticated.set(true);
    }
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
  id?: string;
  name?: string;
  contactNumber?: string;
}
