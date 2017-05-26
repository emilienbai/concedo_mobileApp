export class Reward {
    rewardId: string = "";
    rewarder: string = "";
    buyer: string = "";
    price: number = 0;
    name: string = "";
    count: number = 1;
    timeStamp: string;
    description: string = "";
    code: string = "";
    used: boolean = false;

    constructor() { }

    /**
     * Fill the reward content from a parsed json
     */
    fromData(rewardObj: any): void {
        this.rewardId = rewardObj.rewardId;
        this.rewarder = rewardObj.rewarder;
        this.buyer = rewardObj.buyer;
        this.price = parseInt(rewardObj.price);
        this.name = rewardObj.data.rewardName;
        this.count = parseInt(rewardObj.data.count);
        this.description = rewardObj.data.description;
        this.code = rewardObj.data.code;
    }

    /**
     * Fill the reward content from SQLite result array
     */
    fromDbRes(dbr: Array<any>): void {
        this.rewardId = dbr[0];
        this.rewarder = dbr[1];
        this.buyer = dbr[2];
        this.price = parseInt(dbr[3]);
        this.name = dbr[4];
        this.description = dbr[5];
        this.code = dbr[6];
        this.used = dbr[7];
    }

    copy(r: Reward): void {
        this.rewardId = r.rewardId;
        this.rewarder = r.rewarder;
        this.buyer = r.buyer;
        this.price = r.price;
        this.name = r.name;
        this.count = r.count;
        this.timeStamp = r.timeStamp;
        this.description = r.description;
        this.code = r.code;
    }

    /**
    * Check reward equality
     */
    Equal(r: Reward): boolean {
        return (this.rewardId == r.rewardId &&
            this.rewarder == r.rewarder &&
            this.buyer == r.buyer &&
            this.price == r.price &&
            this.name == r.name &&
            this.count == r.count &&
            this.timeStamp == r.timeStamp &&
            this.description == r.description &&
            this.code == r.code
        )
    }
}
