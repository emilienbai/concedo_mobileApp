import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteShoppingAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Shopping addict";
        this.description = "Complete 'Shopping' offers to unlock this achievement"
        //todo later this.signifierArray = ["res://icon0", "res://icon1", "res://icon2", "res://icon3"];
        this.condition = "confirmed='true' AND type='" + OfferType.shopping + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}