import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../shared/user/user.service";
import { CredentialService } from "../../shared/credential/credential.service";

@Component({
    selector: "ns-homePage",
    providers: [UserService, CredentialService],
    moduleId: module.id,
    templateUrl: "./homepage.html"
})

export class HomePageComponent implements OnInit {

    /**
     * Constructor for the Homepage Component
     */
    constructor(private userService: UserService, private credentialService: CredentialService,
        private router: Router) { }

    /**
     * On init, check if an account already exists and redirect accordingly
     */
    ngOnInit(): void {
        if (this.userService.getUser() != undefined
            && this.credentialService.getCredentials() != undefined) {
            this.router.navigate(["/main_page"]);
        }
    }
}