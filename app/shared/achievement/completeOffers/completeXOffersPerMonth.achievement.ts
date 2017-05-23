import { CompleteXOffersPerAchievement } from "./completeXOffersPer.achievement"

export class CompleteXOffersPerMonthAchievement extends CompleteXOffersPerAchievement {

    constructor() {
        super();
        this.title = "Monthly strike";
        this.description = "Complete several offers in a month to unlock this achievment";
        this.signifierArray = ["res://icon0", "res://icon1", "res://icon2", "res://icon3"];
        this.currentsignifier = this.signifierArray[0];
        this.multiplierLvl = [4, 8, 15];
        this.interval = 60 * 60 * 24 * 7 * 30; //~1block per second : 
    }
}