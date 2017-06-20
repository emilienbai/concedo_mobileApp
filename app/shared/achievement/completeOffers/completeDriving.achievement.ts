import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteDrivingAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Driving Ace";
        this.description = "Complete 'Driving' offers to unlock this achievement"
        this.signifierArray = ["res://steeringwheel0", "res://steeringwheel1", "res://steeringwheel2", "res://steeringwheel3"];
        this.condition = "confirmed='true' AND type='"+OfferType.driving+"'";
        this.multiplierLvl = [5, 20, 50];
    }

}