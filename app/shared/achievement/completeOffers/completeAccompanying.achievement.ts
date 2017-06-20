import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteAccompanyingAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Travelling buddy";
        this.description = "Complete 'Accompanying' offers to unlock this achievement"
        this.signifierArray = ["res://backpack0", "res://backpack1", "res://backpack2", "res://backpack3"];
        this.condition = "confirmed='true' AND type='" + OfferType.accompanying + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}