import * as events from "events";
import { Token } from "./Structures/Net/Response/Token";
import { User } from "./Structures/Net/Response/User";
import { RequestHandler } from "./RequestHandler";
import { RequestType, Scope } from "./Enums";
import { Endpoints } from "./Endpoints";

/**
 * The main API Client
 * @prop token - Current OAuth token
 * @prop refreshToken - OAuth refresh token
 * @extends events.EventEmitter
 */
export class Client extends events.EventEmitter {
    token: Token;
    refreshToken: string;

    /**
     * Create an API Client
     * @param token - A token object
     */
    constructor(token: Token) {
        super();
        this.token = token;
    }

    /**
     * Test!
     * @returns basic hello world smh my head
     */
    public test(): string {
        return "Hello World!";
    }

    /**
     * Get a {@link User} object of the current authenticated user
     *
     * Scopes required:
     * - identify
     *
     * @category Undocumented
     */
    public async getSelf(): Promise<User> {
        const response = await RequestHandler.request<User>({
            auth: `${this.token.token_type} ${this.token.access_token}`,
            body: {},
            endpoint: Endpoints.API_PREFIX + Endpoints.ME,
            headers: {},
            scopes: [
                Scope["identify"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get friends of the current authenticated user
     *
     * Scopes required:
     * - friends.read
     *
     * @category Undocumented
     */
    public async getFriends(): Promise<User[]> {
        const response = await RequestHandler.request<User[]>({
            auth: `${this.token.token_type} ${this.token.access_token}`,
            body: {},
            endpoint: Endpoints.API_PREFIX + Endpoints.FRIEND,
            headers: {},
            scopes: [
                Scope["friends.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a limited {@link User} object of another user
     *
     * Scopes required:
     * - users.read
     *
     * @param id - User id to request
     */
    public async getUser(id: string | number): Promise<User> {
        const response = await RequestHandler.request<User>({
            auth: `${this.token.token_type} ${this.token.access_token}`,
            body: {},
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()),
            headers: {},
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    //#region Chat

    //#endregion Chat
}