/**
 * This enum declares all accessable endpoints of osu!api v2
 */
export enum Endpoints {
    API_PREFIX = "/api/v2",
    OAUTH_PREFIX = "/oauth",

    COMMENT = "/comments",
    COMMENT_SINGLE = "/comments/{comment}",

    RANKING_GET = "/rankings/{mode}/{type}",
    RANKING_GET_SPOTLIGHT = "/spotlights",

    TOKEN = "/token",

    BEATMAP_SINGLE = "/beatmaps/{beatmap}",
    BEATMAP_LOOKUP = "/beatmaps/lookup",
    BEATMAP_SCORES = "/beatmaps/{id}/scores",

    BEATMAPSET_SINGLE = "/beatmapsets/{beatmapset}",
    BEATMAPSET_LOOKUP = "/beatmapsets/lookup",
    BEATMAPSET_SEARCH = "/beatmapsets/search/{filters}",

    CHANGELOG = "/changelog",
    CHANGELOG_BUILD = "/changelog/{stream}/{build}",
    CHANGELOG_SINGLE = "/changelog/{changelog}",

    FRIEND = "/friends",
    ME = "/me/{mode}",

    SEASONAL_BACKGROUNDS = "/seasonal-backgrounds",

    USER_SINGLE = "/users/{user}/{mode}",
    USER_BEATMAPSETS = "/users/{user}/beatmapsets/{type}",
    USER_KUDOSU = "/users/{user}/kudosu",
    USER_RECENT_ACTIVITY = "/users/{user}/recent_activity",
    USER_SCORES = "/users/{user}/scores/{type}"
}