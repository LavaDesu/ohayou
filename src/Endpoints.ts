/**
 * This enum declares all accessable endpoints of osu!api v2
 * - Query parameters are not documented here
 */
export enum Endpoints {
    API_PREFIX = "/api/v2",
    OAUTH_PREFIX = "/oauth",

    /**
     * Returns a list of comments and their replies up to 2 levels deep.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-comments}
     *
     * @category Documented
     */
    COMMENT = "/comments",
    /**
     * Get a comment and its replies up to 2 levels deep.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-a-comment}
     *
     * @category Documented
     */
    COMMENT_SINGLE = "/comments/{comment}",

    /**
     * Gets the current ranking for the specified type and game mode.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-ranking}
     *
     * @category Documented
     */
    RANKING_GET = "/rankings/{mode}/{type}",
    /**
     * Gets the list of spotlights.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-spotlights}
     *
     * @category Documented
     */
    RANKING_GET_SPOTLIGHT = "/spotlights",

    /**
     * Request a (new) token
     * - Request type: POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#authorize-users-for-your-application}
     */
    TOKEN = "/token",

    /** @category Undocumented */
    BEATMAP_SINGLE = "/beatmaps/{beatmap}",
    /** @category Undocumented */
    BEATMAP_LOOKUP = "/beatmaps/lookup",
    /** @category Undocumented */
    BEATMAP_SCORES = "/beatmaps/{id}/scores",

    /** @category Undocumented */
    BEATMAPSET_SINGLE = "/beatmapsets/{beatmapset}",
    /** @category Undocumented */
    BEATMAPSET_LOOKUP = "/beatmapsets/lookup",
    /** @category Undocumented */
    BEATMAPSET_SEARCH = "/beatmapsets/search/{filters}",

    /** @category Undocumented */
    CHANGELOG = "/changelog",
    /** @category Undocumented */
    CHANGELOG_BUILD = "/changelog/{stream}/{build}",
    /** @category Undocumented */
    CHANGELOG_SINGLE = "/changelog/{changelog}",

    /**
     * - Used by:
     *   - {@link Client.getFriends}
     *
     * @category Undocumented
     */
    FRIEND = "/friends",
    /**
     * - Used by:
     *   - {@link Client.getSelf}
     *
     * @category Undocumented
     */
    ME = "/me/{mode}",

    /** @category Undocumented */
    SEASONAL_BACKGROUNDS = "/seasonal-backgrounds",
    /**
     * - Used by:
     *   - {@link Client.getUser}
     *
     * @category Undocumented
     */

    USER_SINGLE = "/users/{user}/{mode}",
    /**
     * - Used by:
     *   - {@link Client.getUserBeatmapsets}
     * @category Undocumented
     */
    USER_BEATMAPSETS = "/users/{user}/beatmapsets/{type}",
    /**
     * - Used by:
     *   - {@link Client.getUserKudosuHistory}
     *
     * @category Undocumented
     */
    USER_KUDOSU = "/users/{user}/kudosu",
    /**
     * - Used by:
     *   - {@link Client.getUserRecent}
     *
     * @category Undocumented
     */
    USER_RECENT_ACTIVITY = "/users/{user}/recent_activity",
    /**
     * - Used by:
     *   - {@link Client.getUserScores}
     *
     * @category Undocumented
     */
    USER_SCORES = "/users/{user}/scores/{type}"
}