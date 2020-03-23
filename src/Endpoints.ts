/**
 * This namespace declares all known endpoints of osu!api v2
 * - Query parameters are not yet documented here
 * - Reference: {@link https://osu.ppy.sh/docs/index.html}
 */
export namespace Endpoints {
    export const API_PREFIX: string = "/api/v2";
    export const OAUTH_PREFIX: string = "/oauth";

    //#region Documented

    //#region Chat

    /**
     * This endpoint allows you to create a new PM channel.
     * - Request type: POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#create-new-pm}
     *
     * @category Documented
     */
    export const CHAT_CREATE_PM: string = "/chat/new";

    /**
     * This endpoint returns new messages since the given message_id along with updated channel 'presence' data.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-updates}
     *
     * @category Documented
     */
    export const CHAT_UPDATES: string = "/chat/updates";

    /**
     * This endpoint returns/sends chat messages for a specific channel.
     * - Request type: GET | POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-channel-messages}
     *   - {@link https://osu.ppy.sh/docs/index.html#send-message-to-channel}
     *
     * @category Documented
     */
    export const CHAT_MESSAGES: string = "/chat/channels/{channel}/messages";

    /**
     * This endpoint allows you to join/leave a public channel.
     * - Request type: PUT | DELETE
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#join-channel}
     *   - {@link https://osu.ppy.sh/docs/index.html#leave-channel}
     *
     * @category Documented
     */
    export const CHAT_CHANNEL: string = "/chat/channels/{channel}/users/{user}";

    /**
     * This endpoint marks the channel as having being read up to the given `message_id`.
     * - Request type: PUT
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#mark-channel-as-read}
     *
     * @category Documented
     */
    export const CHAT_MARK_READ: string = "/chat/channels/{channel}/mark-as-read/{message}";

    /**
     * This endpoint returns a list of all joinable public channels.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-channel-list}.
     *
     * @category Documented
     */
    export const CHAT_CHANNEL_LIST: string = "/chat/channels";

    //#endregion Chat

    //#region Comments

    /**
     * Returns a list of comments and their replies up to 2 levels deep or post a new comment to a comment thread.
     * - Request type: GET | POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-comments}
     *   - {@link https://osu.ppy.sh/docs/index.html#post-a-new-comment}
     *
     * @category Documented
     */
    export const COMMENT: string = "/comments";

    /**
     * Get a comment and its replies up to 2 levels deep, edit an existing comment, or delete an existing comment.
     * - Request type: GET | PUT | PATCH | DELETE
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-a-comment}
     *   - {@link https://osu.ppy.sh/docs/index.html#edit-comment}
     *   - {@link https://osu.ppy.sh/docs/index.html#delete-comment}
     *
     * @category Documented
     */
    export const COMMENT_SINGLE: string = "/comments/{comment}";

    /**
     * Upvote or un-upvote a comment.
     * - Request type: POST | DELETE
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#add-comment-vote}
     *   - {@link https://osu.ppy.sh/docs/index.html#remove-comment-vote}
     *
     * @category Documented
     */
    export const COMMENT_VOTE: string = "/comments/{comment}/vote";

    //#endregion Comments

    //#region Notification

    /**
     * This endpoint returns a list of the user's unread notifications. Sorted descending by `id` with limit of 50.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-notifications}
     *
     * @category Documented
     */
    export const NOTIFICATION_GET_ALL: string = "/notifications";

    /**
     * This endpoint allows you to mark notifications as read.
     * - Request type: POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-notifications}
     *
     * @category Documented
     */
    export const NOTIFICATION_MARK_READ: string = "/notifications/mark-read";

    //#endregion Notification

    //#region Ranking

    /**
     * Gets the current ranking for the specified type and game mode.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-ranking}
     *
     * @category Documented
     */
    export const RANKING_GET: string = "/rankings/{mode}/{type}";

    /**
     * Gets the list of spotlights.
     * - Request type: GET
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#get-spotlights}
     *
     * @category Documented
     */
    export const RANKING_GET_SPOTLIGHT: string = "/spotlights";

    //#endregion Ranking

    //#region Token

    /**
     * Request a (new) token
     * - Request type: POST
     * - References:
     *   - {@link https://osu.ppy.sh/docs/index.html#authorize-users-for-your-application}
     */
    export const TOKEN: string = "/token";

    //#endregion Token

    //#endregion Documented

    //#region Undocumented

    /** @category Undocumented */
    export const BEATMAP_SINGLE: string = "/beatmaps/{beatmap}";
    /** @category Undocumented */
    export const BEATMAP_LOOKUP: string = "/beatmaps/lookup";
    /** @category Undocumented */
    export const BEATMAP_SCORES: string = "/beatmaps/{id}/scores";

    /** @category Undocumented */
    export const BEATMAPSET_SINGLE: string = "/beatmapsets/{beatmapset}";
    /** @category Undocumented */
    export const BEATMAPSET_DISCUSSIONS_REVIEW: string = "/beatmapsets/discussion/review";
    /** @category Undocumented */
    export const BEATMAPSET_DOWNLOAD: string = "/beatmapsets/{beatmapset}/download";
    /** @category Undocumented */
    export const BEATMAPSET_FAVOURITES: string = "/beatmapsets/{beatmapset}/favourites";
    /** @category Undocumented */
    export const BEATMAPSET_LOOKUP: string = "/beatmapsets/lookup";
    /** @category Undocumented */
    export const BEATMAPSET_SEARCH: string = "/beatmapsets/search/{filters}";

    /** @category Undocumented */
    export const CHANGELOG: string = "/changelog";
    /** @category Undocumented */
    export const CHANGELOG_BUILD: string = "/changelog/{stream}/{build}";
    /** @category Undocumented */
    export const CHANGELOG_SINGLE: string = "/changelog/{changelog}";

    /** @category Undocumented */
    export const CHAT_PRESENCE: string = "/chat/presence";

    /**
     * - Used by:
     *   - {@link Client.getFriends}
     *
     * @category Undocumented
     */
    export const FRIEND: string = "/friends";
    /**
     * - Used by:
     *   - {@link Client.getSelf}
     *
     * @category Undocumented
     */
    export const ME: string = "/me/{mode}";
    /** @category Undocumented */
    export const ME_DL_QUOTA: string = "/me/download-quota-check";

    /** @category Undocumented */
    export const REPORT: string = "/reports";

    /** @category Undocumented */
    export const ROOM_SINGLE: string = "/rooms/{room}";
    /** @category Undocumented */
    export const ROOM: string = "/rooms/{mode}";
    /** @category Undocumented */
    export const ROOM_USER: string = "/rooms/{room}/users/{user}";
    /** @category Undocumented */
    export const ROOM_LB: string = "/rooms/{room}/leaderboard";
    /** @category Undocumented */
    export const ROOM_SCORE: string = "/rooms/{room}/playlist/{playlist}/scores/{score}";
    /** @category Undocumented */
    export const ROOM_SCORES: string = "/rooms/{room}/playlist/{playlist}/scores";

    /** @category Undocumented */
    export const SCORE_DOWNLOAD: string = "/scores/{mode}/{score}/download";
    /** @category Undocumented */
    export const SEASONAL_BACKGROUNDS: string = "/seasonal-backgrounds";
    /**
     * - Used by:
     *   - {@link Client.getUser}
     *
     * @category Undocumented
     */

    export const USER_SINGLE: string = "/users/{user}/{mode}";
    /**
     * - Used by:
     *   - {@link Client.getUserBeatmapsets}
     * @category Undocumented
     */
    export const USER_BEATMAPSETS: string = "/users/{user}/beatmapsets/{type}";
    /**
     * - Used by:
     *   - {@link Client.getUserKudosuHistory}
     *
     * @category Undocumented
     */
    export const USER_KUDOSU: string = "/users/{user}/kudosu";
    /**
     * - Used by:
     *   - {@link Client.getUserRecent}
     *
     * @category Undocumented
     */
    export const USER_RECENT_ACTIVITY: string = "/users/{user}/recent_activity";
    /**
     * - Used by:
     *   - {@link Client.getUserScores}
     *
     * @category Undocumented
     */
    export const USER_SCORES: string = "/users/{user}/scores/{type}";

    //#endregion Undocumented

}