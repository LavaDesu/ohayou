import { Endpoints } from "./Endpoints";
import { RequestHandler } from "./RequestHandler";
import {
    Instance,
    Score,
    User,
    UserKudosuHistory,
    UserRecentActivity
} from "./Structures";

import {
    BeatmapsetType,
    Gamemode,
    GrantType,
    RequestType,
    ScoreType
} from "./Enums";

import {
    Beatmapset as BeatmapsetObject,
    KudosuHistory as KudosuObject,
    LegacyScore,
    RecentActivity,
    Token,
    User as UserObject,
    UserCompact as UserCompactObject
} from "./Types";

/**
 * The main API Client
 */
export class Client {
    public clientID: number;
    public clientSecret: string;

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
        const body = {
            client_id: this.clientID,
            client_secret: this.clientSecret
        } as { [name: string]: string | number };

        if (type === "refresh") {
            body.grant_type = GrantType.RefreshToken;
            body.refresh_token = token;
        } else if (type === "auth") {
            body.grant_type = GrantType.AuthCode;
            body.code = token;
        } else
            throw new TypeError("Invalid token type");

        const tokenObject: Token = await RequestHandler.request<Token>({
            body,
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });
        const instance = new Instance(this, tokenObject);
        return instance;
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

    /**
     * Get a user's information
     *
     * - Scopes required:
     *   - users.read
     *
     * @param instance - Instance to authenticate with
     * @param id - User ID to request
     * @param mode - Specific gamemode to request for
     */
    public async getUser(instance: Instance, id: number, mode?: Gamemode | undefined): Promise<User> {
        const response = await RequestHandler.request<UserObject>({
            auth: instance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()).replace("{mode}", mode || ""),
            type: RequestType.GET
        });
        return new User(response, instance);
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