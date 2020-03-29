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
    statistics: { [name: string]: number };
    user: UserCompact;
    /** Only returned from /api/v2/users/{user}/scores/best */
    weight?: Weight;
}

interface Weight {
    percentage: number;
    pp: number;
}