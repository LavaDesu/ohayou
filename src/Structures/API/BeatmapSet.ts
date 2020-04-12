import { Beatmap } from "./";
import { BeatmapSetOnlineStatus } from "../../Enums";

/**
 * **BeatmapSet**
 * - **Undocumented**
 * - References:
 *   - Response sample from `/api/v2/users/{user}/beatmapsets/favourite`
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIBeatmapSet.cs}
 */
export interface BeatmapSet {
    id: number;
    artist: string;
    availability: Availability;
    beatmaps?: Beatmap[];
    bpm: number;
    covers: Covers;
    creator: string;
    discussion_enabled: boolean;
    discussion_locked: false;
    favourite_count: number;
    genre?: Genre;
    has_favourited: boolean;
    hype: Requirement;
    is_scoreable: boolean;
    language?: Language;
    last_updated: string;
    legacy_thread_url: string;
    nominations: Requirement;
    play_count: number;
    preview_url: string;
    ranked: number;
    ranked_date: string | null;
    ratings?: number[];
    source: string;
    status: BeatmapSetOnlineStatus;
    storyboard: boolean;
    submitted_date: string;
    tags: string;
    title: string;
    user_id: number;
    video: boolean;
}

/**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L102}
 */
interface Covers {
    "cover": string;
    "cover@2x": string;
    "card": string;
    "card@2x": string;
    "list": string;
    "list@2x": string;
    "slimcover": string;
    "slimcover@2x": string;
}

/**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L120}
 */
interface Availability {
    download_disabled: boolean;
    more_information: string;
}

/**
 * **Unclear**
 *
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L90}
 */
interface Genre {
    id: string;
    name: string;
}

/**
 * **Unclear**
 *
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/133a3d3e0f15ebb4ef48c302dac04b6346316c24/osu.Game/Beatmaps/BeatmapSetOnlineInfo.cs#L96}
 */
interface Language {
    id: string;
    name: string;
}

interface Requirement {
    current: number;
    required: number;
}