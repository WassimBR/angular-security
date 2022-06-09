import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import * as auth0 from "auth0-js";
import { Router } from "@angular/router";
import * as moment from "moment";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/shareReplay";
import "rxjs/add/operator/do";

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: "",
};

const AUTH_CONFIG = {
  clientID: "z5KYxKy8NRW63Un8KDx1O7CfQTydGLbP",
  domain: "dev-yctzib0m.us.auth0.com",
};

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: "token id_token",
    redirectUri: "https://localhost:4200/lessons",
    scope: "openid email",
  });

  private userSubject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.userSubject
    .asObservable()
    .filter((user) => !!undefined);

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.userInfo();
    }
  }

  login() {
    this.auth0.authorize({ initialScreen: "login" });
  }

  signUp() {
    this.auth0.authorize({ initialScreen: "signUp" });
  }

  retrieveAuthInfoFromUrl() {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        console.log("Could not parse the hash", err);
      } else if (authResult && authResult.idToken) {
        window.location.hash = "";
        console.log("Authentication succeful, authResult: ", authResult);
        this.setSession(authResult);
        this.userInfo();
      }
    });
  }

  userInfo() {
    this.http
      .put<User>("/api/userinfo", null)
      .shareReplay()
      .do((user) => this.userSubject.next(user))
      .subscribe();
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, "second");
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(["/lessons"]);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
