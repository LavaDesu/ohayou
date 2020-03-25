import { GradeCounts, UserCompact } from "./";

/**
 * **UserStatistics**
 *
 * - A summary of various gameplay statistics for a {@link User}. Specific to a {@link GameMode}.
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#userstatistics}
 */
export interface UserStatistics {
    grade_counts: GradeCounts;
    hit_accuracy: number;
    is_ranked: boolean;
    level: Level;
    maximum_combo: number;
    play_count: number;
    play_time: number;
    pp: number;
    pp_rank: number;
    rank: Rank;
    ranked_score: number;
    replays_watched_by_others: number;
    total_hits: number;
    total_score: number;
    user: UserCompact;
}

interface Level {
    /** Docs misspelled this */
    current: number;
    progress: number;
}

interface Rank {
    country: number;
    global: number;
}