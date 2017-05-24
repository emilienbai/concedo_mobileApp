import { Component, OnInit } from "@angular/core";

import { AchievementDbService } from "../../shared/achievement/achievement.db.service"
import { Achievement } from "../../shared/achievement/achievement.interface";
import { LevelService } from "../../shared/level/level.service";

@Component({
    selector: "achievement-panel",
    moduleId: module.id,
    templateUrl: "./achievement_panel.html",
    providers: [AchievementDbService, LevelService]
})

export class AchievementPanelComponent implements OnInit {
    achievementList: Array<Achievement>;
    userLevel: number;
    userPoints: number;

    constructor(private achievementDbService: AchievementDbService, private levelService: LevelService) {
        this.achievementList = new Array();
    }

    ngOnInit(): void { //todo checkuser status : only if volunteer
        this.achievementList = this.achievementDbService.achievementList;
        this.achievementList.forEach(achievement => {
            achievement.levelFromRequirement((num, update) => {
                //console.log(achievement.title + "::lvl::" + num + " is Unlock " + update)
            })
        })
        this.levelService.getUserLevel((lvl, points, up)=>{
            this.userLevel = lvl;
            this.userPoints = points;
            if(up){
                alert("Congrats, you gained a level. You are now level " + lvl + "!")
            }
        })

    }

}