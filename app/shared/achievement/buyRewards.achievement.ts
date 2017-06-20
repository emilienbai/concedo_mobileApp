import { Achievement } from "./achievement.interface";
import { RewardDbService } from "../reward/reward.db.service";
import * as appSettings from "application-settings";


export class BuyRewardsAchievement implements Achievement {
    title: string;
    description: string;
    signifierArray: string[];
    currentsignifier: string;
    multiplierLvl: number[];
    rewardDbService: RewardDbService;

    constructor() {
        this.title = "Rewards addict";
        this.description = "Buy rewards to unlock this achievement";
        this.signifierArray = ["res://rewards0", "res://rewards1", "res://rewards2", "res://rewards3"];
        this.currentsignifier = this.signifierArray[0];
        this.multiplierLvl = [10, 50, 100];
        this.rewardDbService = new RewardDbService();
    }

    levelFromRequirement(callback: (lvl: number, newAchievement: boolean) => void) {
        let isUpdate = false;
        this.rewardDbService.getCount()
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