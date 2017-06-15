import { TextField } from "ui/text-field";
import { ListPicker } from "ui/list-picker";
import { DatePicker } from "ui/date-picker";
import { Switch } from "ui/switch";
import { action } from "ui/dialogs";
import { Page } from "ui/page";
import { EventData } from "data/observable";
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
    /**
     * Offer to create
     */
    offer: Offer;
    /**
     * Types of offer
     */
    items: Array<string> = [];
    /**
     * Is date for task flexible
     */
    flexibleDates: boolean = false;
    /**
     * Date picker for start date
     */
    startDatePicker: DatePicker;
    /**
     * DatePicker for end date
     */
    endDatePicker: DatePicker;

    /**
     * Constructor for the Add Offer Component
     */
    constructor(private offerService: OfferService, private offerDbService: OfferDbService,
        private credentialService: CredentialService, private routerExtensions: RouterExtensions,
        private page: Page) {
        this.offer = new Offer();
        typeList.forEach(type => {
            this.items.push(type);
        })

        this.page.actionBar.title="Add a new task offer";
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
        this.offer.period = this.formatDate(this.startDatePicker.date);
        if (this.flexibleDates) {
            this.offer.period += "-" + this.formatDate(this.endDatePicker.date);
        }
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

    /**
     * Get, save and init startDate Picker
     * @param args Date picker
     */
    onStartPickerLoaded(args) {
        this.startDatePicker = <DatePicker>args.object;
        this.initDatePicker(this.startDatePicker);
    }

    /**
     * Get, save and init endDate Picker
     * @param args Date picker
     */
    onEndPickerLoaded(args) {
        this.endDatePicker = <DatePicker>args.object;
        this.initDatePicker(this.endDatePicker);
    }

    /**
     * When startDate change, update EndatePicker accordingly
     * @param args Change event
     */
    onStartDateChanged(args) {
        if (this.endDatePicker != undefined && this.endDatePicker.date < this.startDatePicker.date) {
            this.endDatePicker.minDate = this.startDatePicker.date;
            this.endDatePicker.date = this.startDatePicker.date;
        }
    }

    /**
     * When switch change position
     * @param args Event argument
     */
    onSwitchChecked(args) {
        let switchObj = <Switch>args.object;
        this.flexibleDates = switchObj.checked;
    }

    displayOfferList() {
        let options = {
            title: "Type selection",
            message: "Choose type of offer",
            cancelButtonText: "Cancel",
            actions: typeList
        };

        action(options).then((result) => {
            console.log(result);
            this.offer.type = result;
        });
    }

    /**
     * Format date to a readable string
     * @param date Date to format
     */
    private formatDate(date: Date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1
        let d = date.getDate();
        let sm = (m >= 10 ? m : "0" + m);
        let sd = (d >= 10 ? d : "0" + d);
        return sd + "/" + sm + "/" + y;
    }

    /**
     * Instanciate the date pickers
     * @param dp Date picker to init
     */
    private initDatePicker(dp: DatePicker) {
        let d = new Date();
        dp.year = d.getFullYear();
        dp.month = d.getMonth();
        dp.day = d.getDate();
        dp.minDate = d;
        let maxDate = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
        dp.maxDate = maxDate;
    }
}