import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "ns-my-offers",
    moduleId: module.id,
    templateUrl: "./my_offers.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class MyOffersComponent {
    public currentVisibility = true;
    public archivedVisibility = false;

    constructor() { }

    /**
     * Triggered when the selected bar item changes
     */
    public onChange(value):void {
        switch (value) {
            case 0:
                this.currentVisibility = true;
                this.archivedVisibility = false;
                break;
            case 1:
                this.currentVisibility = false;
                this.archivedVisibility = true;
                break;
        }
    }
}