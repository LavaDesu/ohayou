import { Instance } from "@Structures";

/** Base abstract class for structures */
export abstract class Base {
    /** The instance that created this object */
    public instance: Instance;
    /** The time at which this object was constructed */
    public createdAt: Date;

    constructor(instance: Instance) {
        this.instance = instance;
        this.createdAt = new Date();
    }
}