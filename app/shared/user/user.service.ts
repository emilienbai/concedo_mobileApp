import * as appSettings from "application-settings";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user.object";
import { Config } from "../../config";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  /**
 * Extract data from http response
 */
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Fill header with required credentials
   */
  private appendHeaders() {
    let cStr = appSettings.getString("credentials");
    let cObj = JSON.parse(cStr);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("address", cObj.address);
    headers.append("pubKey", cObj.pubKey);
    headers.append("privKey", cObj.privKey);
    return headers;
  }

  /**
   * Register a new user on the chain
   */
  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      { user: user },
      { headers: headers }
    )
      .map(this.extractData)
      .catch(this.handleErrors)
  }

  /**
   * Get the balance of a user account
   * @param userAddress User we want to get the balance
   */
  getBalance(userAddress:string) {
    let str = Config.apiUrl + "users/" + userAddress + "/balance";
    return this.http.get(str, {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(b => {
        return b.balance;
      })
      .catch(this.handleErrors);
  }

  /**
   * Get a volunteer from an offer
   */
  getVonlunteer(offerId: string) {
    return this.http.get(Config.apiUrl + "Offer/" + offerId + "/volunteer", {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(u => {
        let user = new User();
        user.fromData(u);
        return user;
      })
      .catch(this.handleErrors)
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  /**
   * Set user in the application setting
   */
  setUser(user: User): void {
    appSettings.setString("user", JSON.stringify(user));
  }

  /**
   * Get user from the application settings
   */
  getUser(): User {
    let uStr = appSettings.getString("user");
    if (uStr == undefined) {
      return undefined;
    }
    let uObj = JSON.parse(uStr);
    let u = new User();
    u.fromData(uObj);
    return u;
  }
}