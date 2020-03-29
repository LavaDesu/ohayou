import { Instance } from "./Instance";

/** Base abstract class for structures */
export abstract class Base {
    /** The instance that created this object */
    protected instance: Instance;
    /** The time at which this object was constructed */
    protected createdAt: Date;

    constructor(instance: Instance) {
        this.instance = instance;
        this.createdAt = new Date();
    }
}