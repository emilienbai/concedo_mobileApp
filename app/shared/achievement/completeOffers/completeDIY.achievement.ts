import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteDIYAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Golden Fingers";
        this.description = "Complete 'DIY' offers to unlock this achievement"
        //todo later this.signifierArray = ["res://icon0", "res://icon1", "res://icon2", "res://icon3"];
        this.condition = "confirmed='true' AND type='" + OfferType.diy + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}