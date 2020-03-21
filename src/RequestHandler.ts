import { BaseRequest } from "./Structures/Net/Request/BaseRequest";
import * as http from "http";
import * as https from "https";

/**
 * Sends and Handles requests
 */
export class RequestHandler {
    private static readonly baseURL: string = "osu.ppy.sh";

    /**
     * Send an HTTP(s) request
     * @param req - Data to send for request
     * @returns Response for requested data
     */
    public static async request<T>(req: BaseRequest): Promise<T> {
        let pResolve: (value?: T | PromiseLike<T>) => void;
        let pReject: (reason?: any) => void;

        const promise = new Promise<T>((r, d) => {
            pResolve = r;
            pReject = d;
        });

        https.request(this.serializeRequest(req))
        .once("response", (res: http.IncomingMessage) => {
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
            pReject(err); //TODO: custom logger?
        })
        .end();

        return promise;
    }

    /**
     * Serialize a Request object
     * @arg request - Request object to serialize
     * @returns Object for use in request
     */
    private static serializeRequest(request: BaseRequest): https.RequestOptions {
        if (request.auth)
            request.headers["Authorization"] = request.auth;

        request.headers["Content-Type"] = "application/json";
        request.headers["User-Agent"] = "LavasTest/1.0 (Discord: Lava#3374)";

        return {
            headers: request.headers,
            host: this.baseURL,
            port: 443,
            method: request.type,
            path: request.endpoint
        };
    }
}