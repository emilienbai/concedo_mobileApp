import { TextField } from "ui/text-field";
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Reward } from "../../shared/reward/reward.object";
import { RewardService } from "../../shared/reward/reward.service";
import { RewardDbService } from "../../shared/reward/reward.db.service";
import { CredentialService } from "../../shared/credential/credential.service";


@Component({
    selector: "ns-add-reward",
    providers: [RewardService, RewardDbService, CredentialService],
    moduleId: module.id,
    templateUrl: "./add_reward.html",
})

export class AddRewardComponent {
    selectedIndex = 0;
    reward: Reward;
    items: Array<string> = [];

    /**
     * Constructor of the Add Reward Component
     */
    constructor(private rewardService: RewardService, private rewardDbService: RewardDbService,
        private credentialService: CredentialService, private routerExtensions: RouterExtensions) {
        this.selectedIndex = 0;
        this.reward = new Reward();
    }

    /**
     * Submit the form to add the reward to the chain and local database
     */
    submit(): void {
        if (this.reward.name != "" && this.reward.price != null
            && this.reward.description != "" && this.reward.code != "") {
            this.rewardService.post(this.reward)
                .subscribe(data => {
                    this.reward.rewarder = this.credentialService.getCredentials().address;
                    this.reward.rewardId = data.rewardId;
                    this.rewardDbService.insert(this.reward);
                    alert("Reward Added");
                    this.routerExtensions.back();
                }, error => {
                    alert("Error while adding reward");
                })
        } else {
            alert("Please complete all fields");
        }
    }
}