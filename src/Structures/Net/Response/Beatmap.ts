import { BeatmapSetOnlineStatus, GameMode } from "../../../Enums";
import { BeatmapSet } from "./BeatmapSet";

/**
 * - **Undocumented**
 * - **Untested**
 * - References:
 *   - {@link https://github.com/ppy/osu/tree/master/osu.Game/Online/Api/Requests/Responses/APIBeatmap.cs}
 */
export interface Beatmap {
    id: number;
    beatmapset_id: number;
    status: BeatmapSetOnlineStatus;
    /** Circular?? */
    beatmapset: BeatmapSet;
    playcount: number;
    passcount: number;
    mode_int: GameMode;
    difficulty_rating: number;
    drain: number;
    cs: number;
    ar: number;
    accuracy: number;
    total_length: number;
    count_circles: number;
    count_sliders: number;
    version: number;
    failtimes: Metric;
    max_combo: number;
}

/**
 * Beatmap metrics based on accumulated online data from community plays.
 * Reference: {@link https://github.com/ppy/osu/osu.Game/Beatmaps/BeatmapMetrics.cs}
 */
interface Metric {
    /** Points of failure on a relative time scale (usually 0..100). */
    fail: number[];
    /** Points of retry on a relative time scale (usually 0..100). */
    exit: number[];
}