import { Scope, RequestType } from "../../../Enums";

/**
 * A base request
 * @prop auth - Token to authenticate for request, if required
 * @prop body - Main request body
 * @prop headers - Extra request headers
 * @prop scopes - Required scopes
 * @prop type - HTTP request type
 */
export interface BaseRequest {
    auth?: string;
    body: { [name: string]: string };
    endpoint: string;
    headers: { [name: string]: string };
    scopes: Scope[];
    type: RequestType;
}