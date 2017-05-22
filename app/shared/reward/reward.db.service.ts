import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");


import { Reward } from "./reward.object";
import { Config } from "../../config";

@Injectable()
export class RewardDbService {
    private database: any;
    rewards: Array<Reward>;

    constructor() {
        this.rewards = [];
        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS reward (rewardId TEXT PRIMARY KEY," +
                " rewarder TEXT, buyer TEXT, price INTEGER, name TEXT, description TEXT," +
                " code TEXT, used BOOLEAN)")
                .then(id => {
                    this.database = db;
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    /**
     * Insert a reward into local database
     */
    insert(r: Reward): void {
        this.database.execSQL("INSERT INTO reward (rewardId, rewarder, buyer, price, name," +
            " description, code, used)" +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [r.rewardId, r.rewarder, r.buyer, r.price, r.name, r.description, r.code, r.used]).then(id => {
                console.log("INSERT RESULT", id);
            }, error => {
                console.log("INSERT ERROR", error);
            });
    }

    /**
     * Update a reward from the database
     */
    update(r: Reward): void {
        this.database.execSQL("UPDATE reward SET buyer=?, used=? WHERE rewardId=?", [r.buyer, r.used, r.rewardId])
            .then(id => {
                console.log("UPDATE RESULT", id);
            }, error => {
                console.log("UPDATE ERROR", error);
            });
    }

    /**
     * Delete a reward from the database
     */
    delete(r: Reward): void {
        this.database.execSQL("DELETE FROM reward WHERE rewardId=?", [r.rewardId])
            .then(id => {
                console.log("DELETE RESULT", id);
            }, error => {
                console.log("DELETE ERROR", error);
            })
    }

    /**
     * Get a specified reward from its ID
     */
    get(rId: string) {
        return new Promise<Reward>((resolve, reject) => {
            (new Sqlite("my.db").then(db => {
                db.get("SELECT * FROM reward WHERE rewardId=?", [rId])
                    .then(row => {
                        let r = new Reward();
                        r.fromDbRes(row);
                        resolve(r);
                    }, error => {
                        reject(error);
                    }, error => {
                        reject(error);
                    })
            }))
        })
    }

    /**
     * Get rewards from the database
     */
    private fetch(whereCondition?: string): Promise<Array<Reward>> {
        let SQLString = "SELECT * FROM reward";
        if (whereCondition) {
            SQLString += " " + whereCondition
        }

        return new Promise<Array<Reward>>((resolve, reject) => {
            (new Sqlite("my.db")).then(db => {
                db.all(SQLString).then(rows => {
                    let rewards: Array<Reward> = [];
                    for (let row in rows) {
                        let r = new Reward();
                        r.fromDbRes(rows[row]);
                        rewards.push(r);
                    }
                    resolve(rewards);
                }, error => {
                    console.log("SELECT ERROR", error);
                    reject();
                });
            });
        });
    }

    /**
     * Get rewards not marked as used
     */
    fetchUnused(): Promise<Array<Reward>> {
        return this.fetch("WHERE used='false'");
    }

    /**
     * Get rewards marked as used
     */
    fetchUsed(): Promise<Array<Reward>> {
        return this.fetch("WHERE used='true'")
    }

    /**
     * Get rewards with no buyers
     */
    fetchUnbought(): Promise<Array<Reward>> {
        return this.fetch("WHERE buyer='' OR buyer='0000000000000000000000000000000000000000'");
    }

    /**
     * Get rewards with buyer
     */
    fetchBought(): Promise<Array<Reward>> {
        return this.fetch("WHERE buyer!='' AND buyer!='0000000000000000000000000000000000000000'");
    }

    /**
     * Return a promise which return the count of rewards matching the condition
     * @param whereCondition Specify condition in SQL Formatted string
     */
    getCount(): Promise<number> {
        let SQLString = "SELECT COUNT(*) from reward ";
        return new Promise<number>((resolve, reject) => {
            (new Sqlite("my.db")).then(db => {
                db.all(SQLString).then(num => {
                    resolve(num);
                }, error => {
                    console.log("SELECT ERROR", error);
                    reject();
                });
            })
        });
    }
}


