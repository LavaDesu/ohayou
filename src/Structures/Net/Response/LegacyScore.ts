import { User } from "./User";
import { Beatmap } from "./Beatmap";
import { BeatmapSet } from "./BeatmapSet";
import { ScoreRank } from "../../../Enums";

/**
 * **LegacyScore**
 * - **Undocumented**
 * - Reference:
 *   - {@link https://github.com/ppy/osu/blob/master/osu/osu.Game/Online/API/Requests/Responses/APILegacyScoreInfo.cs}
 */
export interface LegacyScore {
    score: number;
    max_combo: number;
    user: User;
    id: number;
    replay: boolean;
    created_at: string;
    beatmap: Beatmap;
    accuracy: number;
    pp: number | null;
    beatmapset: BeatmapSet;
    statistics: { [name: string]: number };
    mode_int: number;
    mods: string[]; //TODO: mod enum
    rank: ScoreRank;
}