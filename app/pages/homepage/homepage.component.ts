import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { UserService } from "../../shared/user/user.service";
import { CredentialService } from "../../shared/credential/credential.service";

@Component({
    selector: "ns-homePage",
    providers: [UserService, CredentialService],
    moduleId: module.id,
    templateUrl: "./homepage.html",
    styleUrls: ["homepage-common.css"]

})

export class HomePageComponent implements OnInit {

    /**
     * Constructor for the Homepage Component
     */
    constructor(private userService: UserService, private credentialService: CredentialService,
        private routerExtensions: RouterExtensions, private page: Page) { }

    /**
     * On init, check if an account already exists and redirect accordingly
     */
    ngOnInit(): void {
        if (this.userService.getUser() != undefined
            && this.credentialService.getCredentials() != undefined) {
            this.routerExtensions.navigate(["/main_page"], { clearHistory: true });
        }
        this.page.actionBarHidden = true;
    }
}