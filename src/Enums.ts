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