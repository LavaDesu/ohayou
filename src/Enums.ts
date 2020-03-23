/**
 * Available scopes
 *
 * References:
 * - {@link https://osu.ppy.sh/docs/index.html#scopes}
 * - {@link https://github.com/ppy/osu-web/blob/518cacf3d621ad66412c6fb4b24311389a69dfec/tests/RouteScopesTest.php#L15}
 */
export enum Scope {
    /**
     * Allows reading of the public profile of the authorizing user (`/me`).
     *
     * - Used by
     *   - {@link Client.getSelf}
     */
    "identify" = "identify",
    /**
     * Allows reading of the authorizing user's friend list.
     *
     * - Used by
     *   - {@link Client.getFriends}
     */
    "friends.read" = "friends.read",
    /**
     * Allows reading of public user profiles on behalf of the authorizing user.
     *
     * - Used by
     *   - {@link Client.getUser}
     */
    "users.read" = "users.read"
}

/** Grant types */
export enum GrantType {
    RefreshToken = "refresh_token",
    AuthCode = "authorization_code",
    Password = "password"
}

/** Token types */
export enum TokenType {
    Bearer = "Bearer"
}

/** REST request types */
export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DEL = "DELETE"
}

/**
 * Available game modes
 *
 * Reference: {@link https://osu.ppy.sh/docs/index.html#gamemode}
 */
export enum GameMode {
    Osu = "osu",
    Taiko = "taiko",
    Catch = "fruits",
    Mania = "mania"
}

/**
 * User playstyles
 *
 * Reference: {@link https://github.com/ppy/osu-web/blob/518cacf3d621ad66412c6fb4b24311389a69dfec/app/Models/User.php#L190}
 */
export enum Playstyle {
    Keyboard = "keyboard",
    Tablet = "tablet",
    Mouse = "mouse",
    Touchscreen = "touch"
}

/**
 * Available ranking types
 *
 * Reference: {@link https://osu.ppy.sh/docs/index.html#rankingtype}
 */
export enum RankingType {
    Charts = "charts",
    Country = "country",
    Performance = "performance",
    Score = "score"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/master/osu.Game/Beatmaps/BeatmapSetOnlineStatus.cs}
 */
export enum BeatmapSetOnlineStatus {
    None = -3,
    Graveyard = -2,
    WIP = -1,
    Pending = 0,
    Ranked = 1,
    Approved = 2,
    Qualified = 3,
    Loved = 4
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/c2413543cace984f4970111d1d99892daa46a478/osu.Game/Online/API/Requests/GetUserBeatmapsRequest.cs#L26}
 */
export enum BeatmapSetType {
    Favourite = "favourite",
    RankedAndApproved = "ranked_and_approved",
    Loved = "loved",
    Unranked = "unranked",
    Graveyard = "graveyard"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/c2413543cace984f4970111d1d99892daa46a478/osu.Game/Online/API/Requests/Responses/APIKudosuHistory.cs#L65}
 */

export enum KudosuSource {
    Unknown = "unknown",
    AllowKudosu = "allowkudosu",
    Delete = "delete",
    DenyKudosu = "denykudosu",
    Forum = "forum",
    Recalculate = "recalculate",
    Restore = "restore",
    Vote = "vote"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/c2413543cace984f4970111d1d99892daa46a478/osu.Game/Online/API/Requests/GetUserScoresRequest.cs#L38}
 */

export enum ScoreType {
    Best = "best",
    Firsts = "firsts",
    Recent = "recent"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/master/osu.Game/Scoring/ScoreRank.cs}
 */
export enum ScoreRank {
    D = "D",
    C = "C",
    B = "B",
    A = "A",
    S = "S",
    SH = "SH",
    X = "X",
    XH = "XH"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Online/API/Requests/GetUserRecentActivitiesRequest.cs#L22}
 */
export enum RecentActivityType {
    Achievement = "achievement",
    BeatmapPlaycount = "beatmapPlaycount",
    BeatmapsetApprove = "beatmapsetApprove",
    BeatmapsetDelete = "beatmapsetDelete",
    BeatmapsetRevive = "beatmapsetRevive",
    BeatmapsetUpdate = "beatmapsetUpdate",
    BeatmapsetUpload = "beatmapsetUpload",
    Medal = "medal",
    Rank = "rank",
    RankLost = "rankLost",
    UserSupportAgain = "userSupportAgain",
    UserSupportFirst = "userSupportFirst",
    UserSupportGift = "userSupportGift",
    UsernameChange = "usernameChange"
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Online/API/Requests/GetUserRecentActivitiesRequest.cs#L40}
 */
export enum BeatmapApproval {
    Ranked = "ranked",
    Approved = "approved",
    Qualified = "qualified",
    Loved = "loved"
}