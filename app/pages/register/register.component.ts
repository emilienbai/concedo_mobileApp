import { TextField } from "ui/text-field";
import { SegmentedBarItem } from "ui/segmented-bar"
import { DatePicker } from "ui/date-picker";
import { Page } from "ui/page";
import { Component, NgModule, OnInit } from "@angular/core";
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
    styleUrls: ["register-common.css"]
})

export class RegisterComponent implements OnInit {
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
    /**
     * Waiting for server
     */
    isWaiting: boolean;

    constructor(private userService: UserService, private credentialService: CredentialService,
        private routerExtensions: RouterExtensions, private page: Page) {
        this.user = new User();
        this.onChange(0);
        this.isWaiting = false;
    }

    ngOnInit() {
        this.page.actionBar.title = "Register";
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
     * When date picker is loaded set min max and current date
     * @param args Loaded event
     */
    onPickerLoaded(args) {
        let dp = <DatePicker>args.object;
        let d = new Date();
        let minDate = new Date(d.getFullYear() + -110, d.getMonth(), d.getDate());
        let maxDate = new Date(d.getFullYear() + -13, d.getMonth(), d.getDate());
        let date = new Date(d.getFullYear() + -20, d.getMonth(), d.getDate());
        dp.minDate = minDate;

        dp.maxDate = maxDate;
        dp.date = date;
    }

    /**
     * When date is modified, update user object accordingly
     * @param args changed event
     */
    onDateChanged(args) {
        this.user.birthdate = this.formatDate(new Date(args.value));
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
                this.isWaiting = true;
                this.userService.register(this.user)
                    .subscribe(result => {
                        let credentials = new Credential(result.credentials.address, result.credentials.pubKey, result.credentials.privKey);
                        this.credentialService.setCredentials(credentials);
                        this.credentialService.setStatus(this.user.type);
                        this.userService.setUser(this.user);
                        this.credentialService.setStartDate();
                        this.routerExtensions.navigate(["/main_page"], { clearHistory: true });
                    }, error => {
                        alert(error);
                        this.isWaiting = false;
                    })
            } else {
                alert("Please complete all fields")
            }
        } else {
            alert("Please complete all fields")
        }
    }

    /**
     * Format date to a readable string
     * @param date Date to format
     */
    private formatDate(date: Date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1
        let d = date.getDate();
        let sm = (m >= 10 ? m : "0" + m);
        let sd = (d >= 10 ? d : "0" + d);
        return sd + "/" + sm + "/" + y;
    }
}