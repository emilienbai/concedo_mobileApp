import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/switchMap";
import { RouterExtensions } from "nativescript-angular/router";


import { Offer } from "../../shared/offer/offer.object";
import { OfferService } from "../../shared/offer/offer.service";
import { OfferDbService } from "../../shared/offer/offer.db.service";
import { CredentialService } from "../../shared/credential/credential.service";

/**
 * Component providing more details concerning an offer
 */
@Component({
    selector: "ns-offer-details",
    providers: [OfferService, OfferDbService, CredentialService],
    templateUrl: "./pages/offer_details/offer_details.html",
})

export class OfferDetailsComponent implements OnInit {
    /**
     * Offer we are working on
     */
    offer: Offer;
    /**
     * Can we commit to the offer
     */
    toCommit: boolean = false;
    /**
     * Can we claim the offer
     */
    toClaim: boolean = false;
    /**
     * Can we confirm the offer
     */
    toConfirm: boolean = false;
    /**
     * Can we delete the offer
     */
    canDelete: boolean = false;
    /**
     * Can we access volunteer details
     */
    showVolunteer: boolean = false;

    /**
     * Constructor for the offer details component
     */
    constructor(private offerService: OfferService, private activatedRoute: ActivatedRoute,
        private offerDbService: OfferDbService, private credentialService: CredentialService,
        private router: Router, private routerExtensions: RouterExtensions) {
    }

    /**
     * On init get the offer from the blockchain
     */
    ngOnInit(): void {
        let offerId = this.activatedRoute.snapshot.params['offerId'];
        this.offerService.getOffer(offerId)
            .subscribe(offer => {
                this.offer = offer;
                this.checkAvailability();
            })
    }

    /**
     * Commit to the offer : if the chain accepts, store the offer on local DB
     */
    commit(): void {
        this.offerService.commit(this.offer)
            .subscribe(result => {
                if (result.committed) {
                    this.offer.volunteer = (this.credentialService.getCredentials()).address;
                    this.offerDbService.insert(this.offer);
                    this.checkAvailability();
                } else {
                    alert("An error occured while commiting");
                    this.offerService.getOffer(this.offer.offerId)
                        .subscribe(offer => {
                            this.offer = offer;
                        })
                }
            })
    }

    /**
     * Claim the offer : if the chain accepts, update the offer on local DB
     */
    claim(): void {
        this.offerService.claim(this.offer)
            .subscribe(result => {
                if (result.claimed) {
                    this.offer.claimed = true;
                    this.checkAvailability();
                    this.offerDbService.update(this.offer);
                    this.checkAvailability();
                } else {
                    alert("An error occured while claiming");
                    this.offerService.getOffer(this.offer.offerId)
                        .subscribe(offer => {
                            this.offer = offer;
                            this.checkAvailability();
                        })
                }
            })
    }

    /**
     * Delete the offer : if the chain accepts, delete from local DB
     */
    delete(): void {
        this.offerService.delete(this.offer)
            .subscribe(result => {
                if (result.removed) {
                    this.offerDbService.delete(this.offer);
                    this.routerExtensions.back();
                }
            },
            error => {
                alert("An error occured when trying to delete this offer");
                console.log(JSON.stringify(error))
            })
    }

    /**
     * Confirm the task offer fulfillement
     */
    confirm(): void {
        this.offerService.confirm(this.offer)
            .subscribe(data => {
                if (data.confirmed) {
                    this.offer.confirmed = true;
                    this.offerDbService.update(this.offer);
                    this.checkAvailability();
                    alert("Offer confirmed");
                }
            }, error => {
                alert("Error confirming offer")
            })
    }

    /**
     * Navigate to the volunteer page
     */
    getVolunteer(): void {
        this.router.navigate(["profile", this.offer.offerId, this.offer.volunteer]);
    }

    /**
     * Check which buttons can be displayed
     */
    private checkAvailability(): void {
        let status = this.credentialService.getStatus();
        switch (status) {
            case "volunteer":
                if (parseInt(this.offer.volunteer, 16) == 0) {
                    this.toCommit = true;
                } else if (!this.offer.claimed) {
                    this.toClaim = true;
                }
                break;
            case "elderly":
                if (parseInt(this.offer.volunteer, 16) != 0) {
                    this.showVolunteer = true;
                }
                if (this.offer.claimed && !this.offer.confirmed) {
                    this.toConfirm = true;
                } else if (parseInt(this.offer.volunteer, 16) == 0) {
                    this.canDelete = true;
                }
                break;
        }
    }
}