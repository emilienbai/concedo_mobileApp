import { Component, OnInit } from "@angular/core";

import { CredentialService } from "../../shared/credential/credential.service";
import { AchievementDbService } from "../../shared/achievement/achievement.db.service";
import { Achievement } from "../../shared/achievement/achievement.interface";
import { LevelService } from "../../shared/level/level.service";
import { Observable, Subscription, Subject } from 'rxjs/Rx';

@Component({
    selector: "achievement-panel",
    moduleId: module.id,
    templateUrl: "./achievement_panel.html",
    providers: [CredentialService, AchievementDbService, LevelService],
    styleUrls: ["achievement_panel-common.css"]
})

export class AchievementPanelComponent implements OnInit {
    achievementList: Array<Achievement>;
    userLevel: number;
    userPoints: number;

    constructor(private credentialService: CredentialService,
        private achievementDbService: AchievementDbService, private levelService: LevelService) {
        this.achievementList = new Array();

    }

    ngOnInit(): void {
        if (this.credentialService.getStatus() == "volunteer") {
            this.achievementList = this.achievementDbService.achievementList;
            this.achievementList.forEach(achievement => {
                achievement.levelFromRequirement((num, update) => {
                    //console.log(achievement.title + "::lvl::" + num + " is Unlock " + update)
                })
            })
            this.levelService.getUserLevel((lvl, points, up) => {
                this.userLevel = lvl;
                this.userPoints = points;
                if(this.userPoints == 0) this.userPoints = 0;
                if (up) {
                    alert("Congrats, you gained a level. You are now level " + lvl + "!")
                }
            })
        }
    }

    getRow(value): number {
        return Math.trunc(value);
    }

}