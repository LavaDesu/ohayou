import { Endpoints } from "./Endpoints";
import { RequestHandler, RequestObject } from "./RequestHandler";
import {
    Instance,
    Score,
    User,
    UserKudosuHistory,
    UserRecentActivity
} from "./Structures";

import {
    BeatmapLeaderboardScope,
    BeatmapsetType,
    Gamemode,
    GrantType,
    Mod,
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
import { ClientInstance } from "./Structures/ClientInstance";
import { UserInstance } from "./Structures/UserInstance";

/**
 * The main API Client
 */
export class Client {
    public clientID: string;
    public clientSecret: string;
    private clientInstance?: ClientInstance;

    private ready: Promise<void> | boolean; //TODO: perhaps a better way to do this

    /**
     * Create an API Client
     * @param id - OAuth client ID
     * @param secret - OAuth client secret
     */
    constructor(id: number | string, secret: string) {
        this.clientID = id.toString();
        this.clientSecret = secret;

        this.ready = false;
    }

    //#region Instance

    /**
     * Create a OAuth user instance
     * @param token - Access/Refresh token
     * @param type - Token type, either `refresh` or `auth`
     */
    public async createUserInstance(token: string, type: "refresh" | "auth"): Promise<UserInstance> {
        const body = {
            client_id: this.clientID,
            client_secret: this.clientSecret
        } as { [name: string]: string };

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
        const instance = new UserInstance(this, tokenObject);
        return instance;
    }

    /**
     * Get an instance from the Client Credentials grant
     */
    public async getClientInstance(): Promise<ClientInstance> {
        if (!this.clientInstance)
            if (this.ready instanceof Promise)
                await this.ready;
            else {
                let resolve: () => void;
                this.ready = new Promise(r => resolve = r);
                const tokenObject: Token = await RequestHandler.request<Token>({
                    body: {
                        "grant_type": GrantType.ClientCredentials,
                        "client_id": this.clientID,
                        "client_secret": this.clientSecret,
                        "scope": "public"
                    },
                    endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
                    type: RequestType.POST
                });
                this.clientInstance = new ClientInstance(this, tokenObject);

                this.ready = true;
                resolve!();
            }

        return this.clientInstance!;
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
        return new User(response, this, instance);
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
        return response.map(friend => new User(friend, this, instance));
    }

    //#endregion Misc

    //#region Beatmap

    /**
     * Get a beatmap's leaderboard
     *
     * @param id Beatmap ID to request
     * @param options Request options
     * @param options.type Beatmap leaderboard scope to filter with
     * @param options.mode Gamemode to filter with
     * @param options.mods Mods to filter with
     * @param instance Instance to authenticate with, otherwise use clientInstance
     */
    public async getBeatmapScores(
        id: number | string,
        options: {
            type?: BeatmapLeaderboardScope;
            mode?: Gamemode;
            mods?: Mod[];
        },
        instance?: Instance
    ): Promise<Score[]> {
        const query: { [name: string]: string } = { type: options.type || BeatmapLeaderboardScope.Global };
        if (options.mode)
            query.mode = options.mode;
        if (options.mods)
            query.mods = options.mods.join("+");

        let auth: string;
        if (instance)
            auth = instance.getToken();
        else
            auth = (await this.getClientInstance()).getToken();

        const response = await RequestHandler.request<{ scores: LegacyScore[] }>({
            auth,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_SCORES.replace("{id}", id.toString()),
            type: RequestType.GET,
            query
        });
        return response.scores.map(score => new Score(score, this, instance));
    }

    //#endregion Beatmap

    //#region User

    /**
     * Get a user's information
     *
     * @param id - User ID to request
     * @param mode - Specific gamemode to request for
     */
    public async getUser(id: number | string, mode?: Gamemode): Promise<User> {
        const clientInstance = await this.getClientInstance();

        const response = await RequestHandler.request<UserObject>({
            auth: clientInstance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE.replace("{user}", id.toString()).replace("{mode}", mode || ""),
            type: RequestType.GET
        });
        return new User(response, this);
    }

    /**
     * Get a user's beatmapsets
     *
     * @param id - User ID to request
     * @param type - Beatmapset type
     */
    public async getUserBeatmapsets(id: number | string, type: BeatmapsetType): Promise<BeatmapsetObject[]> {
        const clientInstance = await this.getClientInstance();

        const response = await RequestHandler.request<BeatmapsetObject[]>({
            auth: clientInstance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_BEATMAPSETS.replace("{user}", id.toString()).replace("{type}", type),
            type: RequestType.GET
        });
        return response;
    }

    /**
     * Get a user's kudosu history
     *
     * @param id - User ID to request
     */
    public async getUserKudosuHistory(id: number | string): Promise<UserKudosuHistory[]> {
        const clientInstance = await this.getClientInstance();

        const response = await RequestHandler.request<KudosuObject[]>({
            auth: clientInstance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_KUDOSU.replace("{user}", id.toString()),
            type: RequestType.GET
        });
        return response.map(kudosu => User.serializeKudosuHistory(kudosu));
    }

    /**
     * Get a user's recent activity
     *
     * @param id - User ID to request
     */
    public async getUserRecent(id: number | string): Promise<UserRecentActivity[]> {
        const clientInstance = await this.getClientInstance();

        const response = await RequestHandler.request<RecentActivity[]>({
            auth: clientInstance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_RECENT_ACTIVITY.replace("{user}", id.toString()),
            type: RequestType.GET
        });
        return response.map(activity => User.serializeRecentActivity(activity));
    }

    /**
     * Get a user's scores
     *
     * @param id - User ID to request
     * @param type - Score type
     * @param mode - Mode to get scores for
     */
    public async getUserScores(id: number | string, type: ScoreType, mode?: Gamemode): Promise<Score[]> {
        const clientInstance = await this.getClientInstance();

        const response = await RequestHandler.request<LegacyScore[]>({
            auth: clientInstance.getToken(),
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SCORES.replace("{user}", id.toString()).replace("{type}", type),
            query: mode ? { mode } : {},
            type: RequestType.GET
        });
        return response.map(score => new Score(score, this));
    }

    private async _customRequest<T>(data: RequestObject): Promise<T> {
        const clientInstance = await this.getClientInstance();
        data.auth = clientInstance.getToken();

        const response = await RequestHandler.request<T>(data);

        return response;
    }

    //#endregion User
}