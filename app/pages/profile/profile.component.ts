import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { User } from "../../shared/user/user.object";
import { UserService } from "../../shared/user/user.service";


@Component({
    selector: "ns-profile",
    providers: [UserService],
    moduleId: module.id,
    templateUrl: "./profile.html"
})

export class ProfileComponent implements OnInit {
    /**
     * User object to fill the view
     */
    user: User;
    /**
     * When accessing an external profile, users have to be linked by an offer
     */
    offerId: string;
    /**
     * User adress if trying to access someone else profile
     */
    userAddress: string;
    /**
     * Display the buttons for a volunteer user
     */
    isVolunteer: boolean = false;
    /**
     * Display the buttons for a rewarder user
     */
    isRewarder: boolean = false;
    /**
     * Display the buttons for an elderly user
     */
    isElderly: boolean = false;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
        private routerExtensions: RouterExtensions) {
        this.offerId = this.activatedRoute.snapshot.params['offerId'];
        this.userAddress = this.activatedRoute.snapshot.params['userAddress'];
    }

    /**
     * Check if trying to access own profile or some volunteer profile
     * Then load content accordingly 
     */
    ngOnInit(): void { //Todo get user balance and level of permission
        if (this.offerId && this.userAddress) {
            this.user = new User();
            this.userService.getVonlunteer(this.offerId)
                .subscribe(user => {
                    if (user != null) {
                        this.user = user;
                    }
                },
                error => {
                    alert("Unauthorized profile");
                    this.routerExtensions.back();
                })
        } else {
            this.user = this.userService.getUser();
            this.getStatus();
        }
    }

    /**
     * Set boolean values according to type of user
     * Usefull for action buttons display
     */
    private getStatus(): void {
        switch (this.user.type) {
            case 'volunteer':
                this.isVolunteer = true;
                break;
            case 'elderly':
                this.isElderly = true;
                break;
            case 'rewarder':
                this.isRewarder = true;
                break;
        }
    }
}