import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { HomePageComponent } from "./pages/homepage/homepage.component";

import { RegisterComponent } from "./pages/register/register.component";

import { ProfileComponent } from "./pages/profile/profile.component";

import { OfferListComponent } from "./pages/offer_list/offer_list.component"

import { RewardListComponent } from "./pages/reward_list/reward_list.component";

import { MainPageComponent } from "./pages/main_page/main_page.component";

import { OfferDetailsComponent} from "./pages/offer_details/offer_details.component";

import { RewardDetailsComponent} from "./pages/reward_details/reward_details.component";

import { MyOffersComponent } from "./pages/my_offers/my_offers.component";

import { MyRewardsComponent } from "./pages/my_rewards/my_rewards.component";

import { AddOfferComponent} from "./pages/add_offer/add_offer.component";

import { AddRewardComponent} from "./pages/add_reward/add_reward.component";

import {AchievementPanelComponent} from "./pages/achievement_panel/achievement_panel.component";



@NgModule({
    bootstrap: [
        AppComponent, 
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomePageComponent,
        RegisterComponent,
        ProfileComponent,
        OfferListComponent,
        RewardListComponent,
        OfferDetailsComponent,
        RewardDetailsComponent,
        MyOffersComponent,
        MyRewardsComponent,
        AddOfferComponent,
        AddRewardComponent,
        AchievementPanelComponent,
        MainPageComponent
    ],
    providers: [
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
