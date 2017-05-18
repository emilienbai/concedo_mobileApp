export class Offer {
    offerId: string = "";
    beneficiary: string = "";
    volunteer: string = "";
    reward: number = 0;
    name: string = "";
    period: string = "";
    duration: number = null;
    location: string = "";
    type: string = "";
    description: string = "";
    claimed: boolean = false;
    confirmed: boolean = false;
    confirmedOn: number = 0;

    /**
     * Fill the object content from a parsed json
     */
    fromData(offerObj: any): void {
        this.offerId = offerObj.offerId;
        this.beneficiary = offerObj.beneficiary;
        this.volunteer = offerObj.volunteer;
        this.reward = offerObj.reward;
        this.name = offerObj.data.offerName;
        this.period = offerObj.data.period;
        this.duration = offerObj.data.duration;
        this.location = offerObj.data.location;
        this.type = offerObj.data.type;
        this.description = offerObj.data.description;
        this.claimed = offerObj.claimed;
        this.confirmed = offerObj.confirmed;
        this.confirmedOn = parseInt(offerObj.confirmedOn);
    }

    /**
     * Fill the object content from SQLite result array
     */
    fromDbRes(dbr: Array<any>): void {
        this.offerId = dbr[0];
        this.beneficiary = dbr[1];
        this.volunteer = dbr[2];
        this.reward = dbr[3];
        this.name = dbr[4];
        this.period = dbr[5];
        this.duration = dbr[6];
        this.location = dbr[7];
        this.type = dbr[8];
        this.description = dbr[9];
        this.claimed = (dbr[10] == "true" ? true : false);
        this.confirmed = (dbr[11] == "true" ? true : false);
        this.confirmedOn = parseInt(dbr[12]);
    }

    /**
     * Check offer equality
     */
    Equal(o: Offer): boolean {
        return (this.offerId == o.offerId &&
            this.beneficiary == o.beneficiary &&
            this.volunteer == o.volunteer &&
            this.reward == o.reward &&
            this.name == o.name &&
            this.period == o.period &&
            this.duration == o.duration &&
            this.location == o.location &&
            this.type == o.type &&
            this.description == o.description &&
            this.claimed == o.claimed &&
            this.confirmed == o.confirmed &&
            this.confirmedOn == o.confirmedOn);
    }
}