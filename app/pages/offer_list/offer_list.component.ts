import { ListView } from "ui/list-view";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array"


import { Offer } from "../../shared/offer/offer.object";
import { OfferService } from "../../shared/offer/offer.service";
import { OfferDbService } from "../../shared/offer/offer.db.service";

@Component({
  selector: "ns-offer-list",
  providers: [OfferService, OfferDbService],
  templateUrl: "./pages/offer_list/offer_list.html",
  styleUrls:["pages/offer_list/offer_list-common.css"]
})
export class OfferListComponent implements OnInit {
  /**
   * List of Offer objects to display
   */
  offerList: ObservableArray<Offer>;

  /**
   * Source where to get the offers from
   */
  @Input() offersSource: string;

  /**
   * Constructor for the offer list component
   */
  constructor(private offerService: OfferService, private offerDbService: OfferDbService,
    private router: Router) {
    this.offerList = new ObservableArray([]);
  }

  /**
   * Update offer list
   */
  private updateoffers(offerList: Array<Offer>): void {
    offerList.forEach(offer => {
      this.offerService.getOffer(offer.offerId)
        .subscribe(retrievedOffer => {
          if (!offer.Equal(retrievedOffer)) {
            this.offerDbService.update(retrievedOffer);
            this.offerList.push(retrievedOffer);
          } else {
            this.offerList.push(offer);
          }
        })
    })
  }

  /**
   * Get a string formatted summary of the offer status
   */
  getStatus(o: Offer): string {
    if (parseInt(o.volunteer) == 0) {
      return "Free";
    } else if (!o.claimed) {
      return "Volunteer engaged";
    } else if (!o.confirmed) {
      return "To confirm";
    } else {
      return "Finished";
    }
  }

  /**
   * Access details from a tapped offer 
   */
  getDetails(tappedOffer: Offer): void {
    this.router.navigate(["/offer_details/", tappedOffer.offerId])
  }

  /**
   * Loads the offer in the offerList
   */
  ngOnInit(): void {
    this.offerList = new ObservableArray([]);
    switch (this.offersSource) {
      case "available":
        this.offerService.getAvailable()
          .subscribe(loadedOffers => {
            loadedOffers.forEach((offer) => {
              this.offerList.push(offer);
            });
          });
        break;
      case "local_current":
        this.offerDbService.fetchCurrent()
          .then((offerlist) => {
            this.updateoffers(offerlist);
          })
        break;
      case "local_archived":
        this.offerDbService.fetchArchived()
          .then((offerList) => {
            this.offerList = new ObservableArray(offerList);
          })
        break;
    }
  }
}