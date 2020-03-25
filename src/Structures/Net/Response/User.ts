import { UserCompact, UserStatistics } from "./";
import { GameMode, Playstyle } from "../../../Enums";

/**
 * **User**
 *
 * - **Untested**
 * - **Undocumented**
 * - There are likely nullables that aren't typed here, and it is also a very huge response
 * - References:
 *   - Response sample from `api/v2/me`
 *   - {@link https://github.com/ppy/osu/osu.Game/Users/User.cs}
 */
export interface User extends UserCompact {
    id: number;
    /** Unknown, no reference in lazer */
    account_history?: {}[];
    /** Unknown, no reference in lazer */
    active_tournament_banner?: {}[];
    badges?: Badge[];
    can_moderate?: boolean;
    cover_url?: string;
    discord?: string;
    favourite_beatmapset_count?: number;
    follower_count?: number;
    graveyard_beatmapset_count?: number;
    group_badge?: GroupBadge;
    has_supported?: boolean;
    interests?: string;
    is_bng?: boolean;
    is_full_bn?: boolean;
    is_gmt?: boolean;
    is_limited_bn?: boolean;
    is_nat?: boolean;
    is_restricted?: boolean;
    join_date?: string;
    kudosu?: Kudosu;
    lastfm?: string;
    location?: string;
    loved_beatmapset_count?: number;
    max_blocks?: number;
    max_friends?: number;
    monthly_playcounts?: Count[];
    occupation?: string;
    page?: Page;
    playmode?: GameMode;
    playstyle?: Playstyle[];
    post_count?: number;
    previous_usernames?: string[];
    profile_order?: string[];
    rankHistory?: RankHistory;
    ranked_and_approved_beatmapset_count?: number;
    replays_watched_counts?: Count[];
    scores_first_count?: number;
    skype?: string;
    statistics?: UserStatistics;
    title?: string;
    twitter?: string;
    unranked_beatmapset_count?: number;
    user_achievements?: UserAchievement[];
    website?: string;
}

interface Badge {
    awarded_at: string;
    description: string;
    image_url: string;
}

interface Count {
    count: number;
    start_date: string;
}

interface GroupBadge {
    id: number;
    identifier: string;
    name: string;
    short_name: string;
    description: string;
    colour: string;
}

interface Kudosu {
    available: number;
    total: number;
}

interface Page {
    html: string;
    raw: string;
}

interface RankHistory {
    data: number[];
    mode: GameMode;
}

interface UserAchievement {
    achieved_at: string;
    achievement_id: number;
}

export interface GradeCounts {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
}