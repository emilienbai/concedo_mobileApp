import { Injectable } from "@angular/core";

import { Achievement } from "./achievement.interface";
import { CompleteOffersAchievement } from "./completeOffers/completeOffers.achievement";
import { CompleteAccompanyingAchievement } from "./completeOffers/completeAccompanying.achievement";
import { CompleteShoppingAchievement } from "./completeOffers/completeShopping.achievement";
import { CompleteGardeningAchievement } from "./completeOffers/completeGardening.achievement"
import { CompleteDIYAchievement } from "./completeOffers/completeDIY.achievement";
import { CompleteDrivingAchievement } from "./completeOffers/completeDriving.achievement";
import { BuyRewardsAchievement } from "./buyRewards.achievement";
import { UseForXDaysAchievement } from "./useForXDays.achievement";
import { CompleteXOffersPerWeekAchievement } from "./completeOffers/completeXOffersPerWeek.achievement";
import {CompleteXOffersPerMonthAchievement} from "./completeOffers/completeXOffersPerMonth.achievement";


@Injectable()
export class AchievementDbService {

    achievementList: Array<Achievement>;

    constructor() {
        this.achievementList = new Array();

        let coa = new CompleteOffersAchievement();
        this.achievementList.push(coa);

        let ca = new CompleteAccompanyingAchievement();
        this.achievementList.push(ca);

        let cs = new CompleteShoppingAchievement();
        this.achievementList.push(cs);

        let cg = new CompleteGardeningAchievement();
        this.achievementList.push(cg);

        let cdi = new CompleteDIYAchievement();
        this.achievementList.push(cdi);

        let cdr = new CompleteDrivingAchievement();
        this.achievementList.push(cdr);

        let br = new BuyRewardsAchievement();
        this.achievementList.push(br);

        let uf = new UseForXDaysAchievement();
        this.achievementList.push(uf);

        let cxw = new CompleteXOffersPerWeekAchievement();
        this.achievementList.push(cxw);

        let cxm = new CompleteXOffersPerMonthAchievement();
        this.achievementList.push(cxm);
    }
}