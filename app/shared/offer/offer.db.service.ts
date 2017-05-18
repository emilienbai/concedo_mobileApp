import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");


import { Offer } from "./offer.object";
import { Config } from "../../config";

@Injectable()
export class OfferDbService {
    /**
     * Database object to work with
     */
    private database: any;

    /**
     * Constructor of the service
     */
    constructor() {
        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS offer (offerId TEXT PRIMARY KEY, beneficiary TEXT," +
                " volunteer TEXT, reward INTEGER, name TEXT, period TEXT, duration INTEGER, location TEXT," +
                " type TEXT, description TEXT, claimed BOOLEAN, confirmed BOOLEAN, confirmedOn BOOLEAN)")
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
     * Insert a new offer in the database
     */
    insert(o: Offer): void {
        this.database.execSQL("INSERT INTO offer (offerId, beneficiary, volunteer, reward, name," +
            " period, duration, location, type, description, claimed, confirmed, confirmedOn)" +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [o.offerId, o.beneficiary, o.volunteer, o.reward, o.name, o.period, o.duration,
            o.location, o.type, o.description, o.claimed, o.confirmed, o.confirmedOn]).then(id => {
                console.log("INSERT RESULT", id);
            }, error => {
                console.log("INSERT ERROR", error);
            });
    }

    /**
     * Update an offer of the database
     */
    update(o: Offer): void {
        this.database.execSQL("UPDATE offer SET volunteer='" + o.volunteer +
            "', claimed='" + o.claimed + "', confirmed='" + o.confirmed + "', confirmedOn=" + o.confirmedOn +
            " WHERE offerId ='" + o.offerId + "'").then(id => {
                console.log("UPDATE RESULT", id);
            }, error => {
                console.log("INSERT ERROR", error);
            });
    }

    /**
     * Delete an offer from the database
     */
    delete(o: Offer): void {
        this.database.execSQL("DELETE FROM offer WHERE offerId='" + o.offerId + "'")
            .then(id => {
                console.log("DELETE RESULT", id);
            }, error => {
                console.log("DELETE ERROR", error);
            })
    }

    /**
     * Fetch offers from the database
     */
    fetch(whereCondition?: string): Promise<Array<Offer>> {
        let SQLString = "SELECT * FROM offer";
        if (whereCondition) {
            SQLString += " " + whereCondition;
        }

        return new Promise<Array<Offer>>((resolve, reject) => {
            (new Sqlite("my.db")).then(db => {
                db.all(SQLString).then(rows => {
                    let offers: Array<Offer> = [];
                    for (var row in rows) {
                        let o = new Offer();
                        o.fromDbRes(rows[row]);
                        offers.push(o);
                    }
                    resolve(offers);
                }, error => {
                    console.log("SELECT ERROR", error);
                    reject();
                });
            })
        });
    }

    /**
     * Fetch not confirmed offers from the database
     */
    fetchCurrent(): Promise<Array<Offer>> {
        return this.fetch("WHERE confirmed = 'false'");
    }

    /**
     * Fetch confirmed offers from the database
     */
    fetchArchived(): Promise<Array<Offer>> {
        return this.fetch("WHERE confirmed = 'true'");
    }
}