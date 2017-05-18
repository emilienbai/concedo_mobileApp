import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "ns-my-rewards",
    moduleId: module.id,
    templateUrl: "./my_rewards.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyRewardsComponent {
    public boughtVisibility = true;
    public usedVisibility = false;

    constructor() { }

    /**
     * Triggered when the selected bar item changes
     */
    public onChange(value): void {
        switch (value) {
            case 0:
                this.boughtVisibility = true;
                this.usedVisibility = false;
                break;
            case 1:
                this.boughtVisibility = false;
                this.usedVisibility = true;
                break;
        }
    }
}