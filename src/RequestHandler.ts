import { IncomingMessage, RequestOptions } from "http";
import { request } from "https";
import { parse, format, UrlWithStringQuery } from "url";

import { RequestType } from "./Enums";

const VERSION: string = require("../package.json").version;

/**
 * Sends and Handles requests
 */
export class RequestHandler { //TODO: Other request types
    private static readonly baseURL: string = "osu.ppy.sh";

    /**
     * Send an HTTP(s) request
     * @param data - Data to send for request
     * @returns Response for requested data
     */
    public static async request<T>(data: RequestObject): Promise<T> {
        let pResolve: (value?: T | PromiseLike<T>) => void;
        let pReject: (reason?: any) => void;

        const promise = new Promise<T>((r, d) => {
            pResolve = r;
            pReject = d;
        });

        const serializedData: RequestOptions = this.serializeRequest(data);
        const req = request(serializedData)
            .once("response", (res: IncomingMessage) => {

                if (res.statusCode && res.statusCode >= 400) {
                    pReject(`Request to ${serializedData.path} returned ${res.statusCode}: ${res.statusMessage}`);
                    return;
                }

                res.setEncoding("utf8");

                let raw: string = "";
                res.on("data", d => raw += d);
                res.on("end", () => {
                    try {
                        pResolve(JSON.parse(raw) as T);
                    } catch(e) {
                        pReject(e);
                    }
                });
            })
            .on("error", (err: Error) => {
                pReject(err);
            });

        if (data.type === RequestType.POST)
            req.write(JSON.stringify(data.body));

        req.end();

        return promise;
    }

    /**
     * Serialize a Request object
     * @param data - Request object to serialize
     * @returns Object for use in request
     */
    private static serializeRequest(data: RequestObject): RequestOptions {
        const headers: { [name: string]: string } = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Ohayou/" + VERSION
        };

        if (data.auth)
            headers["Authorization"] = data.auth;

        if (data.type === RequestType.POST)
            headers["Content-Length"] = JSON.stringify(data.body).length.toString();

        const url: UrlWithStringQuery = parse(format({
            protocol: "https",
            hostname: this.baseURL,
            pathname: data.endpoint,
            query: {...data.query}
        }));

        return {
            headers: {...headers, ...data.headers},
            hostname: url.hostname,
            port: 443,
            method: data.type,
            path: url.path
        };
    }
}

/**
 * A base request
 */
export type RequestObject = {
    /** Token to authenticate for request, if required */
    auth?: string;
    /** Main request body */
    body?: {};
    /** Endpoint to request to */
    endpoint: string;
    /** Extra request headers */
    headers?: { [name: string]: string };
    /** Query parameters */
    query?: { [name: string]: string };
    /** HTTP request type */
    type: RequestType;
};