import { CompleteOffersAchievement } from "./completeOffers.achievement";
import { OfferType } from "../../offer/offer.type";

export class CompleteGardeningAchievement extends CompleteOffersAchievement {
    constructor() {
        super();
        this.title = "Green hand";
        this.description = "Complete 'Gardening' offers to unlock this achievement"
        this.signifierArray = ["res://plant0", "res://plant1", "res://plant2", "res://plant3"];
        this.condition = "confirmed='true' AND type='" + OfferType.gardening + "'";
        this.multiplierLvl = [5, 20, 50];
    }

}