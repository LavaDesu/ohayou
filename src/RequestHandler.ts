import { RequestObject } from "./Structures/Net/RequestObject";
import { IncomingMessage, RequestOptions, ClientRequest } from "http";
import { request } from "https";
import { RequestType } from "./Enums";

/**
 * Sends and Handles requests
 */
export class RequestHandler {
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

        const req = request(this.serializeRequest(data))
            .once("response", (res: IncomingMessage) => {
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
        if (data.auth)
            data.headers["Authorization"] = data.auth;

        if (data.type === RequestType.POST)
            data.headers["Content-Length"] = JSON.stringify(data.body).length.toString();

        data.headers["Content-Type"] = "application/json";
        data.headers["User-Agent"] = "LavasTest/1.0 (Discord: Lava#3374)";

        return {
            headers: data.headers,
            host: this.baseURL,
            port: 443,
            method: data.type,
            path: data.endpoint
        };
    }
}