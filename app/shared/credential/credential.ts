export class Credential {
    /**
     * Public adress of the user
     */
    address: string;
    /**
     * Public key of the usrr
     */
    pubKey: string;
    /**
     * Private key of the user
     */
    privKey: string;

    constructor(addr: string, puKey: string, prKey: string) {
        this.address = addr;
        this.pubKey = puKey;
        this.privKey = prKey;
    }
}