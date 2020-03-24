import { Instance } from "./";

export interface Base {
    init(data: {}, instance: Instance): void;
}