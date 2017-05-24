import * as appSettings from "application-settings";
import { Injectable } from "@angular/core";

import { OfferDbService } from "../offer/offer.db.service";


@Injectable()
export class LevelService {

    currentLevel: number = 0;
    levelsArray: Array<number>;
    thresholdArray: Array<number>
    offerDbService: OfferDbService;

    constructor() {
        this.offerDbService = new OfferDbService();

        this.initThreshold();
        this.getUserLevel((lvl, up) => {

        });
    }

    private initThreshold(): void {
        this.levelsArray = new Array(25);
        this.thresholdArray = new Array(25);
        this.levelsArray[0] = 0;
        this.levelsArray[1] = 30;
        this.thresholdArray[0] = 0;
        this.thresholdArray[1] = 30;
        for (var i = 2; i < 25; i++) {
            this.thresholdArray[i] = (Math.trunc(this.thresholdArray[i - 1] * 1.2))
            this.levelsArray[i] = this.levelsArray[i - 1] + this.thresholdArray[i];
        }
    }

    getUserLevel(callback: (lvl: number, pts: number, up: boolean) => void): void {
        this.offerDbService.getPoints()
            .then(points => {
                let i = 0;
                while (points >= this.levelsArray[i]) {
                    i++;
                }
                this.currentLevel = i;
                let leveledUp = false;
                let previousLevel = appSettings.getNumber("level");
                if (this.currentLevel != previousLevel) {
                    leveledUp = true;
                    appSettings.setNumber("level", this.currentLevel);
                }
                callback(this.currentLevel, points, leveledUp);
            })
            .catch(error => {
                callback(1, 0, false);
            })
    }
}