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
    bpm: number;
    /** Unclear */
    convert: {} | null;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    count_total: number;
    cs: number;
    deleted_at: string | null;
    difficulty_rating: number;
    drain: number;
    failtimes?: Metric;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    max_combo?: number;
    mode: GameMode;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    status: BeatmapSetOnlineStatus;
    total_length: number;
    url: string;
    version: number;
}

/**
 * Beatmap metrics based on accumulated online data from community plays.
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Beatmaps/BeatmapMetrics.cs}
 */
interface Metric {
    /** Points of retry on a relative time scale (usually 0..100). */
    exit: number[];
    /** Points of failure on a relative time scale (usually 0..100). */
    fail: number[];
}