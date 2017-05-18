export class User {
    pseudo: string = "";
    name: string = "";
    surname: string = "";
    address: string = "";
    phone: string = "";
    email: string = "";
    type: string = "";
    birthdate: string = "";

    constructor() { }

    /**
     * Fill a user object from a parsed json
     */
    fromData(userObj) {
        this.pseudo = userObj.pseudo;
        this.name = userObj.name;
        this.surname = userObj.surname;
        this.address = userObj.address;
        this.phone = userObj.phone;
        this.email = userObj.email;
        this.type = userObj.type;
        this.birthdate = userObj.birthdate;
    }

    /**
     * Check if all atributes are filled
     */
    isComplete() :boolean {
        return (this.pseudo != "" && this.name != "" && this.surname != ""
            && this.address != "" && this.phone != "" && this.email != ""
            && this.type != "")
    }
}