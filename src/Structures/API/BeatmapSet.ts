import { Beatmap } from "./";
import { BeatmapSetOnlineStatus } from "../../Enums";

/**
 * **BeatmapSet**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIBeatmapSet.cs}
 */
export interface BeatmapSet {
    id: number;
    availability: Availability;
    beatmaps?: Beatmap[];
    bpm: number;
    covers: Covers;
    favourite_count: string;
    genre: Genre;
    has_favourited: string;
    language: Language;
    last_updated: string;
    play_count: string;
    preview_url: string;
    ranked_date: string | null;
    ratings: number[];
    status: BeatmapSetOnlineStatus;
    storyboard: boolean;
    submitted_date: string;
    video: boolean;
    user_id: number;
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L102}
 */
interface Covers {
    "cover@2x": string;
    "card@2x": string;
    "list@2x": string;
}

/**
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L120}
 */
interface Availability {
    download_disabled: boolean;
    more_information: string;
}

/**
 * **Unclear**
 *
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L90}
 */
interface Genre {
    id: string;
    name: string;
}

/**
 * **Unclear**
 *
 * Reference: {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L96}
 */
interface Language {
    id: string;
    name: string;
}