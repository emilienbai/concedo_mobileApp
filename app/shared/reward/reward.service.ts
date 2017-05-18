import * as appSettings from "application-settings";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
var Sqlite = require("nativescript-sqlite");


import { Reward } from "./reward.object";
import { Config } from "../../config";

import { Credential } from "../credential/credential";
import { CredentialService } from "../credential/credential.service";

@Injectable()
export class RewardService {
  private database: any;

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
   * Get all rewards without buyer
   */
  getAvailable() {
    return this.http.get(Config.apiUrl + "Rewards/true", {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(data => {
        let rewardList: Array<Reward> = [];
        data.forEach((rewardObject) => {
          let r = new Reward();
          r.fromData(rewardObject)
          rewardList.push(r);
        });
        return rewardList;
      })
      .catch(this.handleErrors);
  }

  /**
   * Get a specified reward by name
   */
  getReward(rewardId: string) {
    return this.http.get(Config.apiUrl + "reward/" + rewardId, {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(data => {
        let r = new Reward();
        r.fromData(data)
        return r;
      })
      .catch(this.handleErrors);
  }

  /**
   * Post a reward on the chain
   */
  post(reward: Reward) {
    return this.http.post(Config.apiUrl + "rewards", {
      reward: reward
    },
      { headers: this.appendHeaders() }
    ).map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors);
  }

  /**
   * Remove an offer from the chain
   */
  remove(r: Reward) {
    return this.http.delete(Config.apiUrl + "reward/" + r.rewardId, {
      headers: this.appendHeaders()
    }).map(res => this.extractData(res))
      .map(data => {
        return data;
      }).catch(this.handleErrors);
  }

  /**
   * Buy a reward
   */
  buy(reward: Reward) {
    return this.http.put(Config.apiUrl + "rewards/" + reward.rewardId.replace(' ', '%20') + "/buy",
      {},
      { headers: this.appendHeaders() })
      .map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors);
  }

  private handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}