import { Achievement } from "../achievement.interface";
import { OfferDbService } from "../../offer/offer.db.service";
import * as appSettings from "application-settings";


export class CompleteOffersAchievement implements Achievement {
    title: string;
    description: string;
    signifierArray: Array<string>;
    currentsignifier: string;
    multiplierLvl: number[];
    condition : string;
    offerDbService: OfferDbService;

    constructor() {
        this.title = "Offer filler"
        this.description = "Complete a certain number of offers to unlock this achievement"
        this.signifierArray = ["res://offers0", "res://offers1", "res://offers2", "res://offers3"];
        this.condition = "confirmed='true'";
        this.currentsignifier = this.signifierArray[0];
        this.multiplierLvl = [10, 50, 100]
        this.offerDbService = new OfferDbService();
    }

    levelFromRequirement(callback: (lvl: number, newAchievement: boolean) => void) {
        let isUpdate = false;
        this.offerDbService.getCount(this.condition)
            .then(num => {
                for (var i = this.multiplierLvl.length - 1; i >= 0; i--) {
                    if (num >= this.multiplierLvl[i]) {
                        if ((i + 1) != appSettings.getNumber(this.title)) {
                            appSettings.setNumber(this.title, (i + 1));
                            isUpdate = true;
                        }
                        this.currentsignifier = this.signifierArray[i + 1];
                        return callback(i + 1, isUpdate);
                    }
                }
                this.currentsignifier = this.signifierArray[0];
                return callback(0, isUpdate);
            })
    }


}