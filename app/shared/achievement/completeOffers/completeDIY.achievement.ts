import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteDIYAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Golden Fingers";
        this.description = "Complete 'DIY' offers to unlock this achievement"
        this.signifierArray = ["res://diy0", "res://diy1", "res://diy2", "res://diy3"];
        this.condition = "confirmed='true' AND type='" + OfferType.diy + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}