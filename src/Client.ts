import { EventEmitter } from "events";

import { Endpoints } from "./Endpoints";
import { RequestHandler } from "./RequestHandler";
import { Instance } from "./Structures";

import {
    BeatmapSetType,
    GameMode,
    GrantType,
    RequestType,
    Scope,
    ScoreType
} from "./Enums";

import {
    BeatmapSet as BeatmapSetObject,
    Kudosu as KudosuObject,
    LegacyScore,
    RecentActivity,
    Token as TokenObject,
    User as UserObject,
    UserCompact as UserCompactObject
} from "./Structures/Net/Response";

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

    //#region Instance

    /**
     * Create a OAuth user instance
     * @param token - Access/Refresh token
     * @param type - Token type, either `refresh` or `auth`
     */
    public async createInstance(token: string, type: "refresh" | "auth"): Promise<Instance> {
        let tokenObj: TokenObject;

        if (type === "refresh")
            tokenObj = await this.getTokenFromRefresh(token);
        else if (type === "auth")
            tokenObj = await this.getTokenFromAuth(token);
        else
            throw new TypeError("Invalid token type");

        const instance = new Instance(this);
        await instance.refresh(tokenObj);
        return instance;
    }

    /**
     * Get an access token from an authorization code
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#authorize-users-for-your-application}
     *
     * @param code - Authorization code
     */
    public async getTokenFromAuth(code: string): Promise<TokenObject> {
        const response = await RequestHandler.request<TokenObject>({
            body: {
                "grant_type": GrantType.AuthCode,
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
                "grant_type": GrantType.RefreshToken,
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

    //#endregion Instance

    //#region Misc

    /**
     * Get a {@link User} object of the current authenticated user
     *
     * - Scopes required:
     *   - identify
     *
     * @param token - Token to authenticate with
     * @param mode - Specific gamemode to request for
     */
    public async getSelf(token: Instance, mode?: GameMode): Promise<UserObject> {
        const response = await RequestHandler.request<UserObject>({
            auth: token.getToken(),
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
     * - Scopes required:
     *   - friends.read
     *
     * @param token - Token to authenticate with
     */
    public async getFriends(token: Instance): Promise<UserCompactObject[]> {
        const response = await RequestHandler.request<UserCompactObject[]>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.FRIEND,
            scopes: [
                Scope["friends.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    //#endregion Misc

    //#region User

    /**
     * Get a limited {@link User} object of another user
     *
     * - Scopes required:
     *   - users.read
     *
     * @param token - Token to authenticate with
     * @param id - User ID to request
     * @param mode - Specific gamemode to request for
     */
    public async getUser(token: Instance, id: number, mode?: GameMode): Promise<UserObject> {
        const response = await RequestHandler.request<UserObject>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()).replace("{mode}", mode || ""),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a user's beatmapsets
     *
     * - Scopes required:
     *   - users.read
     *
     * @param token - Token to authenticate with
     * @param id - User ID to request
     * @param type - Beatmapset type
     */
    public async getUserBeatmapsets(token: Instance, id: number, type: BeatmapSetType): Promise<BeatmapSetObject[]> {
        const response = await RequestHandler.request<BeatmapSetObject[]>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_BEATMAPSETS.replace("{user}", id.toString()).replace("{type}", type),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a user's kudosu history
     *
     * - Scopes required:
     *   - users.read
     *
     * @param token - Token to authenticate with
     * @param id - User ID to request
     */
    public async getUserKudosuHistory(token: Instance, id: number): Promise<KudosuObject[]> {
        const response = await RequestHandler.request<KudosuObject[]>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_KUDOSU.replace("{user}", id.toString()),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a user's recent activity
     *
     * - Scopes required:
     *   - users.read
     *
     * @param token - Token to authenticate with
     * @param id - User ID to request
     */
    public async getUserRecent(token: Instance, id: number): Promise<RecentActivity[]> {
        const response = await RequestHandler.request<RecentActivity[]>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_RECENT_ACTIVITY.replace("{user}", id.toString()),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a user's scores
     *
     * - Scopes required:
     *   - users.read
     *
     * @param token - Token to authenticate with
     * @param id - User ID to request
     * @param type - Score type
     */
    public async getUserScores(token: Instance, id: number, type: ScoreType): Promise<LegacyScore[]> {
        const response = await RequestHandler.request<LegacyScore[]>({
            auth: token.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SCORES.replace("{user}", id.toString()).replace("{type}", type),
            scopes: [
                Scope["users.read"]
            ],
            type: RequestType.GET
        });
        return response;
    }

    //#endregion User
}