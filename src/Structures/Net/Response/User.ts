import { Playstyle, GameMode } from "../../../Enums";

/**
 * **User**
 *
 * - **Untested**
 * - **Undocumented**
 * - There are many nullables here that isn't typed, and it is also a very huge response
 * - Reference: Auto-generated using response sample from `api/v2/me`
 */
export interface User {
    id?: number;
    username?: string;
    join_date?: string;
    country?: Country;
    avatar_url?: string;
    is_supporter?: boolean;
    has_supported?: boolean;
    is_restricted?: boolean;
    is_gmt?: boolean;
    is_nat?: boolean;
    is_bng?: boolean;
    is_full_bn?: boolean;
    is_limited_bn?: boolean;
    is_bot?: boolean;
    is_active?: boolean;
    can_moderate?: boolean;
    interests?: string;
    occupation?: string;
    title?: string;
    location?: string;
    last_visit?: string;
    is_online?: boolean;
    twitter?: string;
    lastfm?: string;
    skype?: string;
    website?: string;
    discord?: string;
    playstyle?: Playstyle[];
    playmode?: GameMode;
    pm_friends_only?: boolean;
    post_count?: number;
    profile_colour?: string;
    profile_order?: string[];
    cover_url?: string;
    cover?: Cover;
    kudosu?: Kudosu;
    max_blocks?: number;
    max_friends?: number;
    /** Unknown, no reference in lazer */
    account_history?: {}[];
    /** Unknown, no reference in lazer */
    active_tournament_banner?: {}[];
    badges?: Badge[];
    favourite_beatmapset_count?: number;
    follower_count?: number;
    graveyard_beatmapset_count?: number;
    loved_beatmapset_count?: number;
    monthly_playcounts?: Count[];
    page?: Page;
    previous_usernames?: string[];
    ranked_and_approved_beatmapset_count?: number;
    replays_watched_counts?: Count[];
    scores_first_count?: number;
    statistics?: Statistics;
    support_level?: number;
    unranked_beatmapset_count?: number;
    user_achievements?: UserAchievement[];
    rankHistory?: RankHistory;
}

interface Badge {
    awarded_at: string;
    description: string;
    image_url: string;
}

interface Country {
    code: string;
    name: string;
}

interface Cover {
    custom_url: string;
    url: string;
    id: number | null;
}

interface Kudosu {
    total: number;
    available: number;
}

interface Count {
    start_date: string;
    count: number;
}

interface Page {
    html: string;
    raw: string;
}

interface RankHistory {
    mode: GameMode;
    data: number[];
}

interface Statistics {
    level: Level;
    pp: number;
    pp_rank: number;
    ranked_score: number;
    hit_accuracy: number;
    play_count: number;
    play_time: number;
    total_score: number;
    total_hits: number;
    maximum_combo: number;
    replays_watched_by_others: number;
    is_ranked: boolean;
    grade_counts: GradeCounts;
    rank: Rank;
}

export interface GradeCounts {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
}

interface Level {
    current: number;
    progress: number;
}

interface Rank {
    global: number;
    country: number;
}

interface UserAchievement {
    achieved_at: string;
    achievement_id: number;
}