import { Scope, RequestType } from "../../Enums";

/**
 * A base request
 */
export interface RequestObject {
    /** Token to authenticate for request, if required */
    auth?: string;
    /** Main request body */
    body: { };
    /** Endpoint to request to */
    endpoint: string;
    /** Extra request headers */
    headers: { [name: string]: string };
    /** Required scopes */
    scopes: Scope[];
    /** HTTP request type */
    type: RequestType;
}