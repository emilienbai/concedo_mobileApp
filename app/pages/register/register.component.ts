import { TextField } from "ui/text-field";
import { SegmentedBarItem } from "ui/segmented-bar"
import { Component, NgModule } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { User } from "../../shared/user/user.object";
import { Credential } from "../../shared/credential/credential";
import { UserService } from "../../shared/user/user.service";
import { CredentialService } from "../../shared/credential/credential.service";


@Component({
    selector: "ns-register",
    providers: [UserService, CredentialService],
    moduleId: module.id,
    templateUrl: "./register.html",
})

export class RegisterComponent {
    /**
     * User object being filled
     */
    user: User;
    /**
     * First line for user address
     */
    address: string;
    /**
     * PostCode for user address
     */
    postcode: string;
    /**
     * City for user address
     */
    city: string;

    constructor(private userService: UserService, private credentialService: CredentialService,
        private routerExtensions: RouterExtensions) {
        this.user = new User();
        this.onChange(0);
    }

    /**
    * Triggered when the selected bar item changes
    */
    onChange(value): void {
        switch (value) {
            case 0:
                this.user.type = "volunteer";
                break;
            case 1:
                this.user.type = "elderly";
                break;
            case 2:
                this.user.type = "rewarder";
                break;
        }
    }

    /**
     * Post the user on the chain
     * Store all of its informations locally
     * Store credentials locally
     */
    submit(): void {
        if (this.address && this.postcode && this.city) {
            this.user.address = this.address + "\n" + this.postcode + "\n" + this.city;
            if (this.user.isComplete()) {
                this.userService.register(this.user)
                    .subscribe(result => {
                        let credentials = new Credential(result.credentials.address, result.credentials.pubKey, result.credentials.privKey);
                        this.credentialService.setCredentials(credentials);
                        this.credentialService.setStatus(this.user.type);
                        this.userService.setUser(this.user);
                        this.credentialService.setStartDate();
                        this.routerExtensions.back();
                    })
            } else {
                alert("Please complete all fields")
            }
        } else {
            alert("Please complete all fields")
        }
    }
}