/**
 * This enum declares all accessable endpoints of osu!api v2
 */
export enum Endpoints {
    API_PREFIX = "/api/v2",
    OAUTH_PREFIX = "/oauth",

    TOKEN = "/token",

    BEATMAP_SINGLE = "/beatmaps/{beatmap}", // TODO: unimplemented
    BEATMAP_LOOKUP = "/beatmaps/lookup",
    BEATMAP_SCORES = "/beatmaps/{id}/scores",

    BEATMAPSET_SINGLE = "/beatmapsets/{beatmapset}", // TODO: unimplemented
    BEATMAPSET_EVENTS = "/beatmapsets/events", // TODO: unimplemented
    BEATMAPSET_LOOKUP = "/beatmapsets/lookup", // TODO: unimplemented
    BEATMAPSET_SEARCH = "/beatmapsets/search/{filters}", // TODO: unimplemented

    CHANGELOG = "/changelog", // TODO: unimplemented
    CHANGELOG_BUILD = "/changelog/{stream}/{build}", // TODO: unimplemented
    CHANGELOG_SINGLE = "/changelog/{changelog}", // TODO: unimplemented

    FRIEND = "/friends",
    ME = "/me/{mode}",

    NEWS = "/news", // TODO: unimplemented
    NEWS_SINGLE = "/news/{news}", // TODO: unimplemented

    RANKINGS = "/rankings/{mode}/{type}", // TODO: unimplemented

    ROOMS = "/rooms/{mode?}", // TODO: unimplemented
    ROOM_SINGLE = "/rooms/{room}", // TODO: unimplemented
    ROOM_LEADERBOARD = "/rooms/{room}/leaderboard", // TODO: unimplemented
    ROOM_SCORES = "/rooms/{room}/playlist/{playlist}/scores", // TODO: unimplemented

    SCORE_SINGLE = "/scores/{mode}/{score}", // TODO: unimplemented
    SCORE_DOWNLOAD = "/scores/{mode}/{score}/download", // TODO: unimplemented

    SEASONAL_BACKGROUNDS = "/seasonal-backgrounds", // TODO: unimplemented

    SPOTLIGHTS = "/spotlights", // TODO: unimplemented

    USER_SINGLE = "/users/{user}/{mode}",
    USER_BEATMAPSETS = "/users/{user}/beatmapsets/{type}",
    USER_KUDOSU = "/users/{user}/kudosu",
    USER_RECENT_ACTIVITY = "/users/{user}/recent_activity",
    USER_SCORES = "/users/{user}/scores/{type}"
}
