import { Instance } from "./Instance";

export interface Base {
    init(data: {}, instance: Instance): void;
}