import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteGardeningAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Green hand";
        this.description = "Complete 'Gardening' offers to unlock this achievement"
        //todo later this.signifierArray = ["res://icon0", "res://icon1", "res://icon2", "res://icon3"];
        this.condition = "confirmed='true' AND type='" + OfferType.gardening + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}