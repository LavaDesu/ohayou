export const BeatmapApproval = {
    Approved:  "approved",
    Loved:     "loved",
    Qualified: "qualified",
    Ranked:    "ranked"
} as const;

export const BeatmapLeaderboardScope = {
    Country: "country",
    Global: "global",
    Friend: "friend"
} as const;

export const BeatmapsetOnlineStatus = {
    Approved: "approved",
    Graveyard: "graveyard",
    Loved: "loved",
    Pending: "pending",
    Qualified: "qualified",
    Ranked: "ranked",
    WIP: "wip"
} as const;

export const BeatmapsetType = {
    Favourite: "favourite",
    Graveyard: "graveyard",
    Loved: "loved",
    Pending: "unranked", // Alias
    RankedAndApproved: "ranked_and_approved",
    Unranked: "unranked"
} as const;

/** Gamemode types */
export const Gamemode = {
    Osu:   "osu",
    Taiko: "taiko",
    Catch: "fruits",
    Mania: "mania"
} as const;

/** Grant types */
export const GrantType = {
    AuthCode: "authorization_code",
    ClientCredentials: "client_credentials",
    RefreshToken: "refresh_token"
} as const;

export const KudosuAction = {
    Give: "give",
    Reset: "reset",
    Revoke: "revoke"
} as const;

export const KudosuSource = {
    AllowKudosu: "allowkudosu",
    Delete: "delete",
    DenyKudosu: "denykudosu",
    Forum: "forum",
    Recalculate: "recalculate",
    Restore: "restore",
    Unknown: "unknown",
    Vote: "vote"
} as const;

/** Available gameplay mods */
export const Mod = {
    Daycore: "DC",
    DifficultyAdjust: "DA",
    DoubleTime: "DT",
    Easy: "EZ",
    Flashlight: "FL",
    HardRock: "HR",
    HalfTime: "HT",
    Hidden: "HD",
    Nightcore: "NC",
    NoFail: "NF",
    Perfect: "PF",
    Relax: "RX",
    SuddenDeath: "SD",
    WindUp: "WU",
    WindDown: "WD",

    AutoPilot: "AP",
    Blind: "BL",
    Deflate: "DF",
    Grow: "GR",
    SpinIn: "SI",
    SpunOut: "SO",
    Target: "TP",
    Traceable: "TC",
    Transform: "TR",
    Wiggle: "WG",

    Key1: "1K",
    Key2: "2K",
    Key3: "3K",
    Key4: "4K",
    Key5: "5K",
    Key6: "6K",
    Key7: "7K",
    Key8: "8K",
    Key9: "9K",
    DualStage: "DS",
    FadeIn: "FI",
    Mirror: "MR",
    Random: "RD",

    Autoplay: "AT",
    Cinema: "CN",
    NoMod: "NM"
} as const;

/** User playstyles */
export const Playstyle = {
    Keyboard:    "keyboard",
    Tablet:      "tablet",
    Mouse:       "mouse",
    Touchscreen: "touch"
} as const;

/** Available ranking types */
export const RankingType = {
    Charts: "charts",
    Country: "country",
    Performance: "performance",
    Score: "score"
} as const;

export const RecentActivityType = {
    Achievement: "achievement",
    BeatmapPlaycount: "beatmapPlaycount",
    BeatmapsetApprove: "beatmapsetApprove",
    BeatmapsetDelete: "beatmapsetDelete",
    BeatmapsetRevive: "beatmapsetRevive",
    BeatmapsetUpdate: "beatmapsetUpdate",
    BeatmapsetUpload: "beatmapsetUpload",
    Medal: "medal",
    Rank: "rank",
    RankLost: "rankLost",
    UserSupportAgain: "userSupportAgain",
    UserSupportFirst: "userSupportFirst",
    UserSupportGift: "userSupportGift",
    UsernameChange: "usernameChange"
} as const;

/** REST request types */
export const RequestType = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DEL: "DELETE"
} as const;

export const ScoreRank = {
    D: "D",
    C: "C",
    B: "B",
    A: "A",
    S: "S",
    /** S with hidden, also known as S+ */
    SH: "SH",
    /** 100% accuracy, also known as SS */
    X: "X",
    /** X with hidden, also known as SS+ */
    XH: "XH"
} as const;

export const ScoreType = {
    Best: "best",
    Firsts: "firsts",
    Recent: "recent"
} as const;

/** Token types */
export const TokenType = {
    Bearer: "Bearer"
} as const;

export type BeatmapApproval         = (typeof BeatmapApproval)         [keyof typeof BeatmapApproval];
export type BeatmapLeaderboardScope = (typeof BeatmapLeaderboardScope) [keyof typeof BeatmapLeaderboardScope];
export type BeatmapsetOnlineStatus  = (typeof BeatmapsetOnlineStatus)  [keyof typeof BeatmapsetOnlineStatus];
export type BeatmapsetType          = (typeof BeatmapsetType)          [keyof typeof BeatmapsetType];
export type Gamemode                = (typeof Gamemode)                [keyof typeof Gamemode];
export type GrantType               = (typeof GrantType)               [keyof typeof GrantType];
export type KudosuAction            = (typeof KudosuAction)            [keyof typeof KudosuAction];
export type KudosuSource            = (typeof KudosuSource)            [keyof typeof KudosuSource];
export type Mod                     = (typeof Mod)                     [keyof typeof Mod];
export type Playstyle               = (typeof Playstyle)               [keyof typeof Playstyle];
export type RankingType             = (typeof RankingType)             [keyof typeof RankingType];
export type RecentActivityType      = (typeof RecentActivityType)      [keyof typeof RecentActivityType];
export type RequestType             = (typeof RequestType)             [keyof typeof RequestType];
export type ScoreRank               = (typeof ScoreRank)               [keyof typeof ScoreRank];
export type ScoreType               = (typeof ScoreType)               [keyof typeof ScoreType];
export type TokenType               = (typeof TokenType)               [keyof typeof TokenType];
