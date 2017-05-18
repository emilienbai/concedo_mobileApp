import * as appSettings from "application-settings";

import { Injectable } from "@angular/core";

import { Credential } from "./credential"



@Injectable()
/**
 * Service to handle user credentials
 */
export class CredentialService {

  /**
   * Set credential and store it in settings
   */
  setCredentials(credential: Credential): void {
    appSettings.setString("credentials", JSON.stringify(credential));
  }

  /**
   * Set user type and store it locally
   */
  setStatus(status: string): void {
    appSettings.setString("userStatus", status);
  }

  /**
   * Return credential object from local storage
   */
  getCredentials(): Credential {
    let cStr = appSettings.getString("credentials");
    if (cStr == undefined) {
      return undefined;
    }
    let cObj = JSON.parse(cStr);
    return new Credential(cObj.address, cObj.pubKey, cObj.privKey);
  }

  /**
   * Return user type from local storage
   */
  getStatus(): string {
    return appSettings.getString("userStatus");
  }
}