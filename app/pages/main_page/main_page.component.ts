import { SegmentedBarItem } from "ui/segmented-bar"
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { CredentialService } from "../../shared/credential/credential.service";

@Component({
    selector: "ns-main_page",
    moduleId: module.id,
    templateUrl: "./main_page.html",
    providers: [CredentialService],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent {
    /**
     * Display profile page
     */
    public profileVisibility: boolean = true;
    /**
     * Display the list of offers without commited volunteer stored on the chain 
     */
    public availableOffersVisibility: boolean = false;
    /**
     * Display the list of offers not finished stored in local DB
     */
    public currentLocalOffersVisibility: boolean = false;
    /**
     * Display the list of offers finished stored in local DB 
     */
    public archivedLocalOffersVisibility: boolean = false;
    /**
     * Display the list of rewards unbought stored on the chain
     */
    public rewardsVisibility: boolean = false;
    /**
    * Display the list of rewards not used stored in local DB
    */
    public currentLocalRewardsVisibility: boolean = false;
    /**
    * Display the list of rewards not used stored in local DB
    */
    public archivedLocalRewardsVisibility: boolean = false;

    /**
     * Bar item to select what to show
     */
    public barItems: Array<SegmentedBarItem>;

    /**
     * Constructor for the main page component
     */
    constructor(private credentialService: CredentialService) {
        let userStatus = this.credentialService.getStatus();
        this.barItems = [];

        let profileItem = new SegmentedBarItem();
        profileItem.id = "profile";
        profileItem.title = "Profile";
        this.barItems.push(profileItem);


        switch (userStatus) {
            case "elderly":
                let currentLocalOfferItem = new SegmentedBarItem();
                currentLocalOfferItem.id = "currentLocalOffers";
                currentLocalOfferItem.title = "Current Offers";
                this.barItems.push(currentLocalOfferItem);

                let archivedLocalOfferItem = new SegmentedBarItem();
                archivedLocalOfferItem.id = "archivedLocalOffers";
                archivedLocalOfferItem.title = "Past Offers";
                this.barItems.push(archivedLocalOfferItem);
                break;
            case "rewarder":
                let currentLocalRewardItem = new SegmentedBarItem();
                currentLocalRewardItem.id = "currentLocalRewards";
                currentLocalRewardItem.title = "Available Rewards";
                this.barItems.push(currentLocalRewardItem);

                let archivedLocalRewardItem = new SegmentedBarItem();
                archivedLocalRewardItem.id = "archivedLocalRewards";
                archivedLocalRewardItem.title = "Bought Rewards";
                this.barItems.push(archivedLocalRewardItem);
                break;
            case "volunteer":
                let offerItem = new SegmentedBarItem();
                offerItem.id = "availableOffers";
                offerItem.title = "Offers";
                this.barItems.push(offerItem);

                let rewardItem = new SegmentedBarItem();
                rewardItem.id = "rewards";
                rewardItem.title = "Rewards";
                this.barItems.push(rewardItem);
                break;
        }
    }

    /**
     * Triggered when the selected bar item changes
     */
    onChange(value): void {
        let itemId = <string>this.barItems[value].id;

        switch (itemId) {
            case "profile":
                this.resetVisibility();
                this.profileVisibility = true;
                break;
            case "availableOffers":
                this.resetVisibility();
                this.availableOffersVisibility = true;
                break;
            case "currentLocalOffers":
                this.resetVisibility();
                this.currentLocalOffersVisibility = true;
                break;
            case "archivedLocalOffers":
                this.resetVisibility();
                this.archivedLocalOffersVisibility = true;
                break;
            case "rewards":
                this.resetVisibility();
                this.rewardsVisibility = true;
                break;
            case "currentLocalRewards":
                this.resetVisibility();
                this.currentLocalRewardsVisibility = true;
                break;
            case "archivedLocalRewards":
                this.resetVisibility();
                this.archivedLocalRewardsVisibility = true;
                break;
        }
    }

    /**
     * Set the visibility for all pages to false
     */
    private resetVisibility(): void {
        this.profileVisibility = false;
        this.availableOffersVisibility = false;
        this.currentLocalOffersVisibility = false;
        this.archivedLocalOffersVisibility = false;
        this.rewardsVisibility = false;
        this.currentLocalRewardsVisibility = false;
        this.archivedLocalRewardsVisibility = false;
    }
}