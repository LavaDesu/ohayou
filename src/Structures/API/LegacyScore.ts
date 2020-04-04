import { Beatmap, BeatmapSet, UserCompact } from "./";
import { GameMode, Mod, ScoreRank } from "../../Enums";

/**
 * **LegacyScore**
 * - **Undocumented**
 * - References:
 *   - Response sample from `/api/v2/users/{user}/scores/best`
 *   - Response sample from `/api/v2/users/{user}/scores/firsts`
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APILegacyScoreInfo.cs}
 */
export interface LegacyScore {
    id: number;
    accuracy: number;
    beatmap: Beatmap;
    beatmapset: BeatmapSet;
    created_at: string;
    max_combo: number;
    mode: GameMode;
    mode_int: number;
    mods: Mod[];
    pp: number | null;
    rank: ScoreRank;
    replay: boolean;
    score: number;
    statistics: Statistics;
    user: UserCompact;
    /** Only returned from /api/v2/users/{user}/scores/best */
    weight?: Weight;
}

interface Statistics {
    count_50: number;
    count_100: number;
    count_300: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
}

interface Weight {
    percentage: number;
    pp: number;
}