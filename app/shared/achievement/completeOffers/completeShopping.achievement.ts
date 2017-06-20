import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteShoppingAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Shopping addict";
        this.description = "Complete 'Shopping' offers to unlock this achievement"
        this.signifierArray = ["res://caddie0", "res://caddie1", "res://caddie2", "res://caddie3"];
        this.condition = "confirmed='true' AND type='" + OfferType.shopping + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}