import { TextField } from "ui/text-field";
import { ListPicker } from "ui/list-picker";
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Offer } from "../../shared/offer/offer.object";
import { OfferType } from "../../shared/offer/offer.type";
import { OfferService } from "../../shared/offer/offer.service";
import { OfferDbService } from "../../shared/offer/offer.db.service";
import { CredentialService } from "../../shared/credential/credential.service";

var typeList = [OfferType.driving, OfferType.shopping, OfferType.accompanying,
OfferType.gardening, OfferType.diy, OfferType.other];

@Component({
    selector: "ns-add-offer",
    providers: [OfferService, OfferDbService, CredentialService],
    moduleId: module.id,
    templateUrl: "./add_offer.html",
})

export class AddOfferComponent {
    selectedIndex = 0;
    offer: Offer
    items: Array<string> = [];

    /**
     * Constructor for the Add Offer Component
     */
    constructor(private offerService: OfferService, private offerDbService: OfferDbService,
        private credentialService: CredentialService, private routerExtensions: RouterExtensions) {
        this.selectedIndex = 0;
        this.offer = new Offer();

        typeList.forEach(type => {
            this.items.push(type);
        })
        this.offer.type = typeList[0];
    }

    /**
     * When the selected list value changes update the offer accordingly
     */
    onChange(value): void {
        this.offer.type = this.items[value];
    }

    /**
     * Submit the form to add the offer to che chain and local database
     */
    submit(): void {
        if (this.offer.name != "" && this.offer.period != "" && this.offer.duration != null
            && this.offer.location != "" && this.offer.description != "") {
            this.offerService.post(this.offer)
                .subscribe(data => {
                    this.offer.offerId = data.offerId;
                    this.offer.reward = data.reward;
                    this.offer.beneficiary = this.credentialService.getCredentials().address;
                    this.offerDbService.insert(this.offer);
                    alert("Offer saved");
                    this.routerExtensions.back();
                }),
                error => {
                    alert("Error while adding task offer");
                }
        } else {
            alert("Please complete all fields");
        }
    }
}