import { BeatmapSetOnlineStatus } from "../../../Enums";
import { Beatmap } from "./Beatmap";

/**
 * - **Undocumented**
 * - **Untested**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIBeatmapSet.cs}
 */
export interface BeatmapSet {
    covers: Covers;
    id: number;
    status: BeatmapSetOnlineStatus;
    preview_url: string;
    has_favourited: string;
    play_count: string;
    favourite_count: string;
    bpm: number;
    video: boolean;
    storyboard: boolean;
    submitted_date: string;
    ranked_date: string | null;
    last_updated: string;
    ratings: number[];
    user_id: number;
    availability: Availability;
    genre: Genre;
    /** Circular?? */
    beatmaps: Beatmap[];
}

/**
 * Reference: {@link https://github.com/ppy/osu/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L102}
 */
interface Covers {
    "cover@2x": string;
    "card@2x": string;
    "list@2x": string;
}

/**
 * Reference: {@link https://github.com/ppy/osu/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L120}
 */
interface Availability {
    download_disabled: boolean;
    more_information: string;
}

/**
 * **Unclear**
 *
 * Reference: {@link https://github.com/ppy/osu/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L90}
 */
interface Genre {
    id: string;
    name: string;
}

/**
 * **Unclear**
 *
 * Reference: {@link https://github.com/ppy/osu/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L96}
 */
interface Language {
    id: string;
    name: string;
}