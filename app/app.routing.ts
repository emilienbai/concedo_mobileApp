import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomePageComponent } from "./pages/homepage/homepage.component";

import { RegisterComponent } from "./pages/register/register.component";

import { MainPageComponent } from "./pages/main_page/main_page.component";

import { ProfileComponent } from "./pages/profile/profile.component";

import { OfferDetailsComponent } from "./pages/offer_details/offer_details.component";

import { RewardDetailsComponent } from "./pages/reward_details/reward_details.component";

import { MyOffersComponent } from "./pages/my_offers/my_offers.component";

import { MyRewardsComponent } from "./pages/my_rewards/my_rewards.component";

import { AddOfferComponent } from "./pages/add_offer/add_offer.component";

import { AddRewardComponent } from "./pages/add_reward/add_reward.component";


const routes: Routes = [
    { path: "", redirectTo: "/homepage", pathMatch: "full" },
    { path: "homepage", component: HomePageComponent },
    { path: "register", component: RegisterComponent },
    { path: "main_page", component: MainPageComponent },
    { path: "offer_details/:offerId", component: OfferDetailsComponent },
    { path: "profile/:offerId/:userAddress", component: ProfileComponent },
    { path: "reward_details/:rewardId", component: RewardDetailsComponent },
    { path: "myOffers", component: MyOffersComponent },
    { path: "myRewards", component: MyRewardsComponent },
    { path: "addOffer", component: AddOfferComponent },
    { path: "addReward", component: AddRewardComponent }
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }