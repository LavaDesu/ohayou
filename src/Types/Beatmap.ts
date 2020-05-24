import { Beatmapset } from "../Types";
import { BeatmapsetOnlineStatus, Gamemode } from "../Enums";

export interface Beatmap {
    id: number;
    accuracy: number;
    ar: number;
    beatmapset?: Beatmapset;
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
    mode: Gamemode;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    status: BeatmapsetOnlineStatus;
    total_length: number;
    url: string;
    version: number;
}

/**
 * Beatmap metrics based on accumulated online data from community plays.
 */
interface Metric {
    /** Points of retry on a relative time scale (usually 0..100). */
    exit: number[];
    /** Points of failure on a relative time scale (usually 0..100). */
    fail: number[];
}