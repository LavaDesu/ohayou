import { UserCompact } from "../Types";

export type UserStatistics = {
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
    user?: UserCompact; // Not circular
};

export type GradeCounts = {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
};

export type Level = {
    current: number;
    progress: number;
};

export type Rank = {
    country: number | null;
    global: number | null;
};