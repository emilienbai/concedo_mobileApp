import { TextField } from "ui/text-field";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array"

import { Reward } from "../../shared/reward/reward.object";
import { RewardService } from "../../shared/reward/reward.service";
import { RewardDbService } from "../../shared/reward/reward.db.service";

@Component({
  selector: "ns-reward-list",
  providers: [RewardService, RewardDbService],
  templateUrl: "./pages/reward_list/reward_list.html",

})
export class RewardListComponent implements OnInit {
  /**
   * List of the rewards Object to display
   */
  rewardList: ObservableArray<Reward>;
  /**
   * Source from where to get the rewards
   */
  @Input() rewardsSource: string;

  /**
   * Constructor for the reward list component
   */
  constructor(private rewardService: RewardService, private rewardDbService: RewardDbService,
    private router: Router) {
    this.rewardList = new ObservableArray([]);
  }

  /**
   * Update the reward List
   */
  private updateRewards(rewardList: Array<Reward>): void {
    rewardList.forEach(reward => {
      this.rewardService.getReward(reward.rewardId)
        .subscribe(retrievedReward => {
          if (!reward.Equal(retrievedReward)) {
            retrievedReward.used = reward.used;
            this.rewardDbService.update(retrievedReward);
            this.rewardList.push(retrievedReward);
          } else {
            this.rewardList.push(reward);
          }
        })
    })
  }

  /**
   * Get details for a tapped reward
   */
  getDetails(tappedReward: Reward): void {
    this.router.navigate(["/reward_details/" + tappedReward.rewardId])
  }

  /**
   * Get reward sourse then load rewards
   */
  ngOnInit() {
    this.rewardList = new ObservableArray([]);

    switch (this.rewardsSource) {
      case "available":
        this.rewardService.getAvailable()
          .subscribe(loadedRewards => {
            loadedRewards.forEach((reward) => {
              this.rewardList.push(reward);
            });
          });
        break;
      case "local_unused":
        this.rewardDbService.fetchUnused()
          .then((rewardList) => {
            this.updateRewards(rewardList);
          })
        break;
      case "local_used":
        this.rewardDbService.fetchUsed()
          .then(rewardList => {
            this.rewardList = new ObservableArray(rewardList);
          })
        break;
      case "local_unbought":
        this.rewardDbService.fetchUnbought()
          .then(rewardList => {
            this.updateRewards(rewardList);
          })
        break;
      case "local_bought":
        this.rewardDbService.fetchBought()
          .then(rewardList => {
            this.rewardList = new ObservableArray(rewardList);
          })
        break;
    }
  }
}