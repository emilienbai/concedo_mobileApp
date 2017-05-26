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
  rewardList: Array<Reward>;
  /**
   * Concatenate same rewards
   */
  groupedRewards: Array<Array<Reward>>;
  /**
   * Source from where to get the rewards
   */
  @Input() rewardsSource: string;

  /**
   * Constructor for the reward list component
   */
  constructor(private rewardService: RewardService, private rewardDbService: RewardDbService,
    private router: Router) {
    this.rewardList = new Array();
  }

  /**
   * Update the reward List
   */
  private updateRewards(rewardList: Array<Reward>): void {
    let treated = 0;
    rewardList.forEach(reward => {
      this.rewardService.getReward(reward.rewardId)
        .subscribe(retrievedReward => {
          if (!reward.Equal(retrievedReward)) {
            retrievedReward.used = reward.used;
            console.log(JSON.stringify(reward));
            console.log(JSON.stringify(retrievedReward));
            this.rewardDbService.update(retrievedReward);
            this.rewardList.push(retrievedReward);
            treated++;
            if (treated == rewardList.length) {
              this.groupRewards();
            }
          } else {
            this.rewardList.push(reward);
            treated++;
            if (treated == rewardList.length) {
              this.groupRewards();
            }
          }

        }, error => {
          treated++;
          if (treated == rewardList.length) {
            this.groupRewards();
          }
        })
    })
  }

  /**
   * Group the reward based on the retrieved up to date list
   */
  private groupRewards(): void {
    this.groupedRewards = new Array();
    for (var i = 0; i < this.rewardList.length; i++) {
      let exists: boolean = false;
      for (var j = 0; j < this.groupedRewards.length; j++) {
        if (this.rewardList[i].name == (this.groupedRewards[j])[0].name &&
          this.rewardList[i].description == (this.groupedRewards[j])[0].description) {
          exists = true;
          this.groupedRewards[j].push(this.rewardList[i]);
          break;
        }
      }
      if (!exists) {
        this.groupedRewards.push(new Array(this.rewardList[i]));
      }
    }
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
    this.rewardList = new Array();

    switch (this.rewardsSource) {
      case "available":
        this.rewardService.getAvailable()
          .subscribe(loadedRewards => {
            this.rewardList = loadedRewards;
            this.groupRewards();
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
            this.rewardList = rewardList;
            this.groupRewards();
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
            this.rewardList = rewardList;
            this.groupRewards()
          })
        break;
    }
  }
}