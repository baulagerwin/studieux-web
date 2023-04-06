import http, { setJwtInHeader } from "./httpService";
import jwtDecode from "jwt-decode";
import AuthDto from "../dtos/AuthDto";
import IUser from "../models/IUser";
import baseURL from "./baseURL";

let url = "/auth";

class AuthService {
  private token = "studieux_token";

  public async signIn(data: AuthDto): Promise<string> {
    const { data: user } = await http.post(baseURL + url, data);
    return user;
  }

  public loginWithJwt(jwt: string): void {
    localStorage.setItem(this.token, jwt);
    setJwtInHeader(jwt);
  }

  public getCurrentUser(): IUser | null {
    const jwt = localStorage.getItem(this.token);

    let decoded: null = null;

    if (jwt) decoded = jwtDecode(jwt);

    return decoded;
  }

  public isLoggedIn(): boolean {
    const jwt = localStorage.getItem(this.token);
    setJwtInHeader(jwt);

    return Boolean(jwt);
  }

  public logout(): void {
    localStorage.removeItem(this.token);
  }

  public getToken(): String | null {
    return localStorage.getItem(this.token);
  }
}

export default new AuthService();
