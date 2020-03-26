import { Beatmap, BeatmapSet, UserCompact } from "./";
import { ScoreRank } from "../../Enums";

/**
 * **LegacyScore**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu/osu.Game/Online/API/Requests/Responses/APILegacyScoreInfo.cs}
 */
export interface LegacyScore {
    id: number;
    accuracy: number;
    beatmap: Beatmap;
    beatmapset: BeatmapSet;
    created_at: string;
    max_combo: number;
    mode_int: number;
    mods: string[]; //TODO: mod enum
    pp: number | null;
    rank: ScoreRank;
    replay: boolean;
    score: number;
    statistics: { [name: string]: number };
    user: UserCompact;
}