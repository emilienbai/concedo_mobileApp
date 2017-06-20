import {CompleteXOffersPerAchievement} from "./completeXOffersPer.achievement"

export class CompleteXOffersPerWeekAchievement extends CompleteXOffersPerAchievement{

    constructor(){
        super();
        this.title = "Weekly strike";
        this.description = "Complete several offers in a week to unlock this achievment";
        this.signifierArray = ["res://weekly0", "res://weekly1", "res://weekly2", "res://weekly3"];
        this.currentsignifier = this.signifierArray[0];
        this.multiplierLvl = [2, 4, 6];
        this.interval = 60 * 60 * 24 * 7; //~1block per second : 
    }
}