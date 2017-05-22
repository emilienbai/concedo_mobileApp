import { Achievement } from "../achievement.interface";
import { OfferDbService } from "../../offer/offer.db.service";
import { Offer } from "../../offer/offer.object";
import * as appSettings from "application-settings";


export class CompleteXOffersPerAchievement implements Achievement {
    title: string;
    description: string;
    signifierArray: string[];
    currentsignifier: string;
    multiplierLvl: number[];
    offerDbService: OfferDbService;
    interval: number;

    constructor() {
        this.offerDbService = new OfferDbService();
    }

    private getMaxStrike(offers: Array<Offer>): number {
        let maxStrike = 0;
        let baseOffer, currentOffer: Offer;
        for (var i = 0; i < offers.length; i++) {
            let currentStrike = 0;
            baseOffer = offers[i];
            for (let j = i + 1; j < offers.length; j++) {
                currentOffer = offers[j];
                if (currentOffer.confirmedOn - baseOffer.confirmedOn <= this.interval) {
                    currentStrike++;
                } else {
                    break;
                }
            }
            if (currentStrike > maxStrike) {
                maxStrike = currentStrike;
            }
        }
        return maxStrike;
    }

    levelFromRequirement(callback: (lvl: number, newAchievement: boolean) => void) {
        let isUpdate = false;
        this.offerDbService.fetchOrdered()
            .then(offerArray => {
                let maxStrike = this.getMaxStrike(offerArray);

                for (var i = this.multiplierLvl.length - 1; i >= 0; i--) {
                    if (maxStrike >= this.multiplierLvl[i]) {
                        if ((i + 1) != appSettings.getNumber(this.title)) {
                            appSettings.setNumber(this.title, (i + 1));
                            isUpdate = true;
                        }
                        this.currentsignifier = this.signifierArray[i + 1];
                        return callback(i + 1, isUpdate);
                    }
                    this.currentsignifier = this.signifierArray[0];
                    return callback(0, isUpdate);
                }

            })
            .catch(error => console.log("Error", error));
    }

}