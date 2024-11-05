import {Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userEmail: string | undefined = undefined;
  public userId: string | undefined = undefined;
  public isAuthenticated: boolean = false;

  public setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userEmail = idToken.sub;
      this.userId = idToken.userId;
      this.isAuthenticated = true;
    }
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getUserCredentials(): UserCredentials {
    return {
      userEmail: this.userEmail !== undefined ? this.userEmail : null,
      userId: this.userId !== undefined ? this.userId : null
    };
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
  userId?: string;
}

export interface UserCredentials {
  userId: string | null;
  userEmail: string | null;
}
