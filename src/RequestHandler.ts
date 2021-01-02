import { IncomingMessage, RequestOptions } from "http";
import { request } from "https";
import { parse, format, UrlWithStringQuery } from "url";

import { RequestType } from "./Enums";

import { version as VERSION } from "../package.json";

const baseURL: string = "osu.ppy.sh";

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
    public async request<T>(data: RequestObject): Promise<T> {
        let pResolve: (value: T | PromiseLike<T>) => void;
        let pReject: (reason?: any) => void;

        const promise = new Promise<T>((r, d) => {
            pResolve = r;
            pReject = d;
        });

        const serializedData: RequestOptions = this.serializeRequest(data);
        const req = request(serializedData)
            .once("response", (res: IncomingMessage) => {

                if (res.statusCode && res.statusCode >= 400) {
                    pReject(`Request to ${serializedData.path ?? "null path???"} returned ${res.statusCode}: ${res.statusMessage ?? "No message"}`);
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
    private serializeRequest(data: RequestObject): RequestOptions {
        const headers: { [name: string]: string } = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": data.userAgent ?? `Ohayou/${VERSION} (https://github.com/LavaDesu/ohayou)`
        };

        if (data.auth)
            headers.Authorization = data.auth;

        if (data.type === RequestType.POST)
            headers["Content-Length"] = JSON.stringify(data.body).length.toString();

        const url: UrlWithStringQuery = parse(format({
            protocol: "https",
            hostname: data.host ?? baseURL,
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
    body?: Record<string, unknown>;
    /** Endpoint to request to */
    endpoint: string;
    /** Extra request headers */
    headers?: { [name: string]: string };
    /** Optional host override */
    host?: string;
    /** Query parameters */
    query?: { [name: string]: string };
    /** HTTP request type */
    type: RequestType;
    /** Optional user agent override */
    userAgent?: string;
};