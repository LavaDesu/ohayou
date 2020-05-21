import { Beatmap } from "@Types";
import { BeatmapsetOnlineStatus } from "@Enums";

export interface Beatmapset {
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
    status: BeatmapsetOnlineStatus;
    storyboard: boolean;
    submitted_date: string;
    tags: string;
    title: string;
    user_id: number;
    video: boolean;
}

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

interface Availability {
    download_disabled: boolean;
    more_information: string;
}

interface Genre {
    id: string;
    name: string;
}

interface Language {
    id: string;
    name: string;
}

interface Requirement {
    current: number;
    required: number;
}