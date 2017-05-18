import * as appSettings from "application-settings";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
var Sqlite = require("nativescript-sqlite");


import { Offer } from "./offer.object";
import { Config } from "../../config";

import { Credential } from "../credential/credential";
import { CredentialService } from "../credential/credential.service";

@Injectable()
export class OfferService {

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
   * Get offers without commited volunteers from the chain
   */
  getAvailable() {
    return this.http.get(Config.apiUrl + "Offers/true", {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(data => {
        let offerList: Array<Offer> = [];
        data.forEach((offerObject) => {
          let o = new Offer();
          o.fromData(offerObject)
          offerList.push(o);
        });
        return offerList;
      })
      .catch(this.handleErrors);
  }

  /**
   * Get an offer from its ID
   */
  getOffer(offerId: string) {
    return this.http.get(Config.apiUrl + "Offer/" + offerId, {
      headers: this.appendHeaders()
    })
      .map(res => this.extractData(res))
      .map(data => {
        let o = new Offer();
        o.fromData(data)
        return o;
      })
      .catch(this.handleErrors);
  }

  /**
   * Post an offer to the chain
   */
  post(offer: Offer) {
    return this.http.post(Config.apiUrl + "Offers", {
      offer: offer
    },
      { headers: this.appendHeaders() })
      .map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors)
  }

  /**
   * Delete an offer from the chain
  */
  delete(offer: Offer) {
    return this.http.delete(Config.apiUrl + "offer/" + offer.offerId, {
      headers: this.appendHeaders()
    }).map(res => this.extractData(res))
      .map(data => {
        return data;
      }).catch(this.handleErrors);
  }

  /**
   * Commit to an offer
   */
  commit(offer: Offer) {
    return this.http.put(Config.apiUrl + "Offers/" + offer.offerId + "/commit",
      {},
      { headers: this.appendHeaders() })
      .map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors);
  }

  /**
   * Claim an offer
   */
  claim(offer: Offer) {
    return this.http.put(Config.apiUrl + "Offers/" + offer.offerId + "/claim",
      {},
      { headers: this.appendHeaders() })
      .map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors);
  }

  /**
   * Confirm an offer
   */
  confirm(offer: Offer) {
    return this.http.put(Config.apiUrl + "Offers/" + offer.offerId + "/confirm",
      {},
      { headers: this.appendHeaders() })
      .map(res => this.extractData(res))
      .map(data => {
        return data;
      })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}