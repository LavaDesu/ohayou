import { Beatmap, Beatmapset, UserCompact } from "@Types";
import { Gamemode, Mod, ScoreRank } from "@Enums";

/**
 * Legacy Score
 * - Scores submitted on osu!stable
 */
export type LegacyScore = {
    id: number;
    accuracy: number;
    beatmap: Beatmap;
    beatmapset: Beatmapset;
    created_at: string;
    max_combo: number;
    mode: Gamemode;
    mode_int: number;
    mods: Mod[];
    pp: number | null;
    rank: ScoreRank;
    replay: boolean;
    score: number;
    statistics: ScoreStatistics;
    user: UserCompact;
    /** Only returned from /api/v2/users/{user}/scores/best */
    weight?: Weight;
};

export type ScoreStatistics = {
    count_50: number;
    count_100: number;
    count_300: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
};

export type Weight = {
    percentage: number;
    pp: number;
};