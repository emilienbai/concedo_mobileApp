import { Component, OnInit } from "@angular/core";

import { AchievementDbService } from "../../shared/achievement/achievement.db.service"
import { Achievement } from "../../shared/achievement/achievement.interface";

@Component({
    selector: "achievement-panel",
    moduleId: module.id,
    templateUrl: "./achievement_panel.html",
    providers: [AchievementDbService]
})

export class AchievementPanelComponent implements OnInit {
    achievementList: Array<Achievement>;

    constructor(private achievementDbService: AchievementDbService) {
        this.achievementList = new Array();
    }

    ngOnInit(): void {
        this.achievementList = this.achievementDbService.achievementList;
        this.achievementList.forEach(achievement => {
            achievement.levelFromRequirement((num, update) => {
                console.log(achievement.title + "::lvl::" + num + " is Unlock " + update)
            })
        })
    }

}