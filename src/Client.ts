import { Endpoints } from "@Endpoints";
import { RequestHandler } from "@RequestHandler";
import {
    Instance,
    Score,
    User,
    UserKudosuHistory,
    UserRecentActivity
} from "@Structures";

import {
    BeatmapsetType,
    Gamemode,
    GrantType,
    RequestType,
    ScoreType
} from "@Enums";

import {
    Beatmapset as BeatmapsetObject,
    KudosuHistory as KudosuObject,
    LegacyScore,
    RecentActivity,
    Token as TokenObject,
    User as UserObject,
    UserCompact as UserCompactObject
} from "@Types";

/**
 * The main API Client
 */
export class Client {
    public clientID: number;
    private clientSecret: string;

    /**
     * Create an API Client
     * @param id - OAuth client ID
     * @param secret - OAuth client secret
     */
    constructor(id: number, secret: string) {
        this.clientID = id;
        this.clientSecret = secret;
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
                "client_id": this.clientID,
                "client_secret": this.clientSecret,
                "code": code
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
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
                "client_id": this.clientID,
                "client_secret": this.clientSecret,
                "refresh_token": token
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
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
     * @param instance - Instance to authenticate with
     * @param mode - Specific gamemode to request for
     */
    public async getSelf(instance: Instance, mode?: Gamemode): Promise<User> {
        const response = await RequestHandler.request<UserObject>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.ME.replace("{mode}", mode || ""),
            type: RequestType.GET
        });
        return new User(response, instance);
    }

    /**
     * Get friends of the current authenticated user
     *
     * - Scopes required:
     *   - friends.read
     *
     * @param instance - Instance to authenticate with
     */
    public async getFriends(instance: Instance): Promise<User[]> {
        const response = await RequestHandler.request<UserCompactObject[]>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.FRIEND,
            type: RequestType.GET
        });
        return response.map(friend => new User(friend, instance));
    }

    //#endregion Misc

    //#region User

    public async getUser(instance: Instance, id: number): Promise<User>;
    public async getUser(instance: Instance, id: number, mode: Gamemode): Promise<User>;
    public async getUser(instance: Instance, id: number, mode: Gamemode | undefined, raw: true): Promise<UserObject>;
    /**
     * Get a user's information
     *
     * - Scopes required:
     *   - users.read
     *
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     * @param mode - Specific gamemode to request for
     * @param raw - Whether or not to return the raw request response
     */
    public async getUser(instance: Instance, id: number, mode?: Gamemode | undefined, raw?: boolean): Promise<User | UserObject> { //TODO: fix whatever this is because vscode intellisense doesnt like it
        const response = await RequestHandler.request<UserObject>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()).replace("{mode}", mode || ""),
            type: RequestType.GET
        });
        return raw ? response : new User(response, instance);
    }

    /**
     * Get a user's beatmapsets
     *
     * - Scopes required:
     *   - users.read
     *
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     * @param type - Beatmapset type
     */
    public async getUserBeatmapsets(instance: Instance, id: number, type: BeatmapsetType): Promise<BeatmapsetObject[]> {
        const response = await RequestHandler.request<BeatmapsetObject[]>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_BEATMAPSETS.replace("{user}", id.toString()).replace("{type}", type),
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
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     */
    public async getUserKudosuHistory(instance: Instance, id: number): Promise<UserKudosuHistory[]> {
        const response = await RequestHandler.request<KudosuObject[]>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_KUDOSU.replace("{user}", id.toString()),
            type: RequestType.GET
        });
        return response.map(kudosu => User.serializeKudosuHistory(kudosu));
    }

    /**
     * Get a user's recent activity
     *
     * - Scopes required:
     *   - users.read
     *
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     */
    public async getUserRecent(instance: Instance, id: number): Promise<UserRecentActivity[]> {
        const response = await RequestHandler.request<RecentActivity[]>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_RECENT_ACTIVITY.replace("{user}", id.toString()),
            type: RequestType.GET
        });
        return response.map(activity => User.serializeRecentActivity(activity));
    }

    /**
     * Get a user's scores
     *
     * - Scopes required:
     *   - users.read
     *
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     * @param type - Score type
     * @param mode - Mode to get scores for
     */
    public async getUserScores(instance: Instance, id: number, type: ScoreType, mode?: Gamemode): Promise<Score[]> {
        const response = await RequestHandler.request<LegacyScore[]>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SCORES.replace("{user}", id.toString()).replace("{type}", type),
            query: mode ? { mode } : {},
            type: RequestType.GET
        });
        return response.map(score => new Score(score, instance));
    }

    //#endregion User
}