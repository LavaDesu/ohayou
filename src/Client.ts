import { EventEmitter } from "events";
import { Token as TokenObject } from "./Structures/Net/Response/Token";
import { User as UserObject } from "./Structures/Net/Response/User";
import { RequestHandler } from "./RequestHandler";
import { RequestType, Scope, GameMode } from "./Enums";
import { Endpoints } from "./Endpoints";
import { Token } from "./Structures/Token";

/**
 * The main API Client
 */
export class Client extends EventEmitter {
    private client_id: number;
    private client_secret: string;

    /**
     * Create an API Client
     * @param id - OAuth client ID
     * @param secret - OAuth client secret
     */
    constructor(id: number, secret: string) {
        super();
        this.client_id = id;
        this.client_secret = secret;
    }

    /**
     * Name a token
     * - Overridable for custom naming behaviour
     * @param token - Token to name
     */
    private async nameToken(token: Token): Promise<Token> {
        const owner: UserObject = await this.getSelf(token);
        token.name = owner.username;
        return token;
    }

    /**
     * Create a token
     * @param token - Access/Refresh token
     * @param type - Token type, either `refresh` or `auth`
     */
    public async createToken(token: string, type: "refresh" | "auth"): Promise<Token> {
        let tokenObj: TokenObject;

        if (type === "refresh")
            tokenObj = await this.getTokenFromRefresh(token);
        else if (type === "auth")
            tokenObj = await this.getTokenFromAuth(token);
        else
            throw new TypeError("Invalid token type");

        const pendingToken = new Token(tokenObj, this);
        this.nameToken(pendingToken);
        return pendingToken;
    }

    /**
     * Get an access token from an authorization code
     * - Reference: {@link https://osu.ppy.sh/docs/index.html#authorize-users-for-your-application}
     * @param code - Authorization code
     */
    public async getTokenFromAuth(code: string): Promise<TokenObject> {
        const response = await RequestHandler.request<TokenObject>({
            body: {
                "grant_type": "authorization_code",
                "client_id": this.client_id,
                "client_secret": this.client_secret,
                "code": code
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            scopes: [],
            type: RequestType.POST
        });
        return response;
    }

    /**
     * Get an access token from a refresh token
     * @param token - Refresh token
     */
    public async getTokenFromRefresh(token: string): Promise<TokenObject> {
        const response = await RequestHandler.request<TokenObject>({
            body: {
                "grant_type": "refresh_token",
                "client_id": this.client_id,
                "client_secret": this.client_secret,
                "refresh_token": token
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            scopes: [],
            type: RequestType.POST
        });
        return response;
    }

    /**
     * Get a {@link User} object of the current authenticated user
     *
     * Scopes required:
     * - identify
     *
     * @param token - Token to authenticate with
     * @param mode - Specific gamemode to request for
     */
    public async getSelf(token: Token, mode?: GameMode): Promise<UserObject> {
        const response = await RequestHandler.request<UserObject>({
            auth: `${token.toString()}`,
            endpoint: Endpoints.API_PREFIX + Endpoints.ME.replace("{mode}", mode || ""),
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
     * @param token - Token to authenticate with
     */
    public async getFriends(token: Token): Promise<UserObject[]> {
        const response = await RequestHandler.request<UserObject[]>({
            auth: `${token.toString()}`,
            endpoint: Endpoints.API_PREFIX + Endpoints.FRIEND,
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
     * @param token - Token to authenticate with
     * @param id - User ID to request
     * @param mode - Specific gamemode to request for
     */
    public async getUser(token: Token, id: number, mode?: GameMode): Promise<UserObject> {
        const response = await RequestHandler.request<UserObject>({
            auth: `${token.toString()}`,
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()).replace("{mode}", mode || ""),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }
}