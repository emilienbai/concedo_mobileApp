import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { Reward } from "../../shared/reward/reward.object";
import { RewardService } from "../../shared/reward/reward.service";
import { RewardDbService } from "../../shared/reward/reward.db.service"
import { CredentialService } from "../../shared/credential/credential.service";


@Component({
    selector: "ns-offer-details",
    providers: [RewardService, RewardDbService, CredentialService],
    templateUrl: "./pages/reward_details/reward_details.html",
})

export class RewardDetailsComponent implements OnInit {
    /**
     * Reward we are working on
     */
    reward: Reward;
    /**
     * Can we buy this reward
     */
    isBuyable: boolean = false;
    /**
     * Can we remove/delete this reward
     */
    isRemovable: boolean = false;
    /**
     * Can we set this reward as "used"
     */
    isUsable: boolean = false;

    /**
     * Constructor for the Rewads Details Component
     */
    constructor(private rewardService: RewardService, private rewardDbService: RewardDbService,
        private activatedRoute: ActivatedRoute,
        private routerExtensions: RouterExtensions, private credentialService: CredentialService) {
        this.reward = new Reward();
    }

    /**
     * Load the reward data from the blockchain on init
     */
    ngOnInit(): void {
        let rewardId = this.activatedRoute.snapshot.params['rewardId'];
        this.rewardService.getReward(rewardId)
            .subscribe(reward => {
                this.reward = reward;
                this.checkAvailability();
            })
    }

    /**
     * Buy the reward and store it locally
     */
    buy(): void {
        this.rewardService.buy(this.reward)
            .subscribe(result => {
                if (result.bought) {
                    this.reward.buyer = (this.credentialService.getCredentials()).address;
                    alert("reward bought");
                    this.rewardDbService.insert(this.reward);
                    this.checkAvailability();
                } else {
                    alert("error while buying reward")
                }
            })
    }

    /**
     * Mark the reward as used
     */
    use(): void {
        this.reward.used = true;
        this.rewardDbService.update(this.reward);
        this.checkAvailability();
    }

    /**
     * Remove the reward from the chain
     */
    remove(): void {
        this.rewardService.remove(this.reward)
            .subscribe(data => {
                if (data.removed) {
                    this.rewardDbService.delete(this.reward);
                    this.routerExtensions.back();
                } else {
                    alert("Error while removing reward");
                }
            }, error => {
                console.log(JSON.stringify(error));
            })
    }

    /**
     * Check which button can be displayed
     */
    private checkAvailability(): void {
        let status = this.credentialService.getStatus();
        if (parseInt(this.reward.buyer, 16) == 0 || this.reward.buyer == "") {
            switch (status) {
                case "volunteer":
                    this.isBuyable = true;
                    break;
                case "rewarder":
                    this.isRemovable = true;
                    break;
            }
        }
        if (status == "volunteer" && !this.reward.used) {
            this.isUsable = true;
        }
    }
}