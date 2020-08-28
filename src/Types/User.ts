import { Gamemode, Playstyle } from "../Enums";
import { UserStatistics } from "../Types";

export type UserBasic = {
    id: number;
    username: string;
};

export type UserCompact = UserBasic & {
    avatar_url: string;
    country: Country;
    country_code: string;
    cover: Cover;
    is_active: boolean;
    is_bot: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: string | null;
    support_level: number;
};

export type UserExtended = {
    cover_url: string;
    discord: string | null;
    has_supported: boolean;
    interests: string | null;
    join_date: string;
    kudosu: {
        available: number;
        total: number;
    };
    lastfm: string | null;
    location: string | null;
    max_blocks: number;
    max_friends: number;
    occupation: string | null;
    playmode: Gamemode;
    playstyle: Playstyle[] | null;
    post_count: number;
    profile_order: string[];
    skype: string | null;
    title: string | null;
    twitter: string | null;
    website: string | null;
};

export type UserExtra = {
    account_history: AccountHistory[];
    active_tournament_banner: Banner[];
    badges: Badge[];
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    group_badge: GroupBadge;
    loved_beatmapset_count: number;
    monthly_playcounts: Count;
    page: Page;
    previous_usernames: string[];
    ranked_and_approved_beatmapset_count: number;
    rankHistory: RankHistory; //XXX: camelCase
    replays_watched_counts: Count[];
    statistics: UserStatistics;
    unranked_beatmapset_count: number;
    user_achievements: Achievement[];
};


export type AccountHistory = {
    description: string;
    type: string;
    timestamp: string;
    length: number;
};

export type Achievement = {
    achieved_at: string;
    achievement_id: number;
};

export type Badge = {
    awarded_at: string;
    description: string;
    image_url: string;
};

export type Banner = {
    id: number;
    tournament_id: number;
    image: string;
};

export type Count = {
    count: number;
    start_date: string;
};

export type Country = {
    code: string;
    name: string;
};

export type Cover = {
    id: number | null;
    custom_url: string | null;
    url: string;
};

export type GroupBadge = {
    id: number;
    identifier: string;
    name: string;
    short_name: string;
    description: string;
    colour: string;
};

export type Kudosu = {
    available: number;
    total: number;
};

export type Page = {
    html: string;
    raw: string;
};

export type RankHistory = {
    data: number[];
    mode: Gamemode;
};

export type User = UserCompact & UserExtended & UserExtra;