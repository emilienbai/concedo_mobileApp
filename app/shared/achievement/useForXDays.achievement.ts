import { Achievement } from "./achievement.interface";
import { CredentialService } from "../credential/credential.service";
import * as appSettings from "application-settings";

export class UseForXDaysAchievement implements Achievement {
    title: string;
    description: string;
    signifierArray: string[];
    currentsignifier: string;
    multiplierLvl: number[];
    credentialService: CredentialService;

    constructor() {
        this.title = "Loyal User"
        this.description = "Keep using the app to unlock this achievement";
        this.signifierArray = ["res://keepgoing0", "res://keepgoing1", "res://keepgoing2", "res://keepgoing3"];
        this.currentsignifier = this.signifierArray[0];
        this.multiplierLvl = [30, 180, 365];
        this.credentialService = new CredentialService();

    }
    levelFromRequirement(callback: (lvl: number, newAchievement: boolean) => void) {
        let date = new Date();
        let startDate = this.credentialService.getStartDate();
        let diffMs = date.getTime() - startDate.getTime();
        let diffDays = diffMs / (1000 * 60 * 60 * 24);
        let isUpdate = false;
        for (var i = this.multiplierLvl.length; i >= 0; i--) {
            if (diffDays >= this.multiplierLvl[i]) {
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
    }

}