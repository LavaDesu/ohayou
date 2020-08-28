import { Base } from "../Structures";
import { Beatmapset as BeatmapsetObject } from "../Types";
import { Client, Beatmap, User } from "..";
import { BeatmapsetOnlineStatus } from "../Enums";
import { UserBasic } from "../Types/User";

export class Beatmapset extends Base {
    id: number;

    beatmaps?: Beatmap[];

    artist: string;
    availability: BeatmapsetAvailability;
    bpm: number;
    covers: { [name: string]: string };
    /** Beatmap's creator/mapper */
    creator: UserBasic | User;
    favouriteCount: number;
    genre?: BeatmapsetGenre;
    hype: BeatmapsetRequirement;
    language?: BeatmapsetLanguage;
    lastUpdated: Date;
    nomations: BeatmapsetRequirement;
    playCount: number;
    rankedDate: Date | null;
    source: string;
    status: BeatmapsetOnlineStatus;
    submittedDate: Date;
    tags: string;
    title: string;

    discussionEnabled: boolean;
    discussionLocked: boolean;
    scoreable: boolean;
    hasStoryboard: boolean;
    hasVideo: boolean;

    /**
     * Construct a beatmapset object
     * @param data Raw beatmapset data
     */
    constructor(data: BeatmapsetObject, client: Client) {
        super(client);

        this.id = data.id;

        this.artist = data.artist;
        this.availability = data.availability;
        this.bpm = data.bpm;
        this.covers = data.covers;
        this.favouriteCount = data.favourite_count;
        this.genre = data.genre;
        this.hype = data.hype;
        this.language = data.language;
        this.lastUpdated = new Date(data.last_updated);
        this.nomations = data.nominations;
        this.playCount = data.play_count;
        this.rankedDate = data.ranked_date ? new Date(data.ranked_date) : null;
        this.source = data.source;
        this.status = data.status;
        this.submittedDate = new Date(data.submitted_date);
        this.tags = data.tags;
        this.title = data.title;

        this.discussionEnabled = data.discussion_enabled;
        this.discussionLocked = data.discussion_locked;
        this.scoreable = data.is_scoreable;
        this.hasStoryboard = data.storyboard;
        this.hasVideo = data.video;

        this.creator = {
            id: data.user_id,
            username: data.creator
        };
        this.fetchCreator();
    }

    private async fetchCreator() {
        this.creator = await this.client.getUser(this.creator.id);
    }
}

export interface BeatmapsetAvailability {
    download_disabled: boolean;
    more_information: string;
}

export interface BeatmapsetGenre {
    id: string;
    name: string;
}

export interface BeatmapsetLanguage {
    id: string;
    name: string;
}

export interface BeatmapsetRequirement {
    current: number;
    required: number;
}
