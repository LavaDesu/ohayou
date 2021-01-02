import { Instance } from "../Structures";
import { Client } from "../Client";

/** Base abstract class for structures */
export abstract class Base {
    /** The client that created this object */
    public client: Client;
    /** The instance that created this object */
    public instance?: Instance;
    /** The time at which this object was constructed */
    public createdAt: Date;

    constructor(client: Client, instance?: Instance) {
        this.client = client;
        if (instance)
            this.instance = instance;
        this.createdAt = new Date();
    }
}
