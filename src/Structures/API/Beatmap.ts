import { BeatmapSet } from "./";
import { BeatmapSetOnlineStatus, GameMode } from "../../Enums";

/**
 * **Beatmap**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIBeatmap.cs}
 */
export interface Beatmap {
    id: number;
    accuracy: number;
    ar: number;
    beatmapset?: BeatmapSet;
    beatmapset_id: number;
    count_circles: number;
    count_sliders: number;
    cs: number;
    difficulty_rating: number;
    drain: number;
    failtimes: Metric;
    max_combo: number;
    mode_int: GameMode;
    passcount: number;
    playcount: number;
    status: BeatmapSetOnlineStatus;
    total_length: number;
    version: number;
}

/**
 * Beatmap metrics based on accumulated online data from community plays.
 * Reference: {@link https://github.com/ppy/osu/blob/master/osu.Game/Beatmaps/BeatmapMetrics.cs}
 */
interface Metric {
    /** Points of retry on a relative time scale (usually 0..100). */
    exit: number[];
    /** Points of failure on a relative time scale (usually 0..100). */
    fail: number[];
}