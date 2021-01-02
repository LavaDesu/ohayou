import { Base, Beatmapset } from "../Structures";
import { Beatmap as BeatmapObject } from "../Types";
import { Gamemode, BeatmapsetOnlineStatus } from "../Enums";
import { Client } from "../Client";

/** Represents a Beatmap class */
export class Beatmap extends Base {
    /** Beatmap ID */
    id: number;

    /** Beatmap's parent mapset */
    beatmapset?: Beatmapset;
    /** Beatmap's beats per minute (BPM) */
    bpm: number;
    /** Beatmap's deletion date, if available */
    deletedAt: Date | null;
    /** Beatmap's target gamemode */
    gamemode: Gamemode;
    /** Beatmap's hit length (aka drain time) - total length excluding breaks - in seconds */
    hitLength: number;
    /** Beatmap's total length in seconds */
    length: number;
    /** Beatmap's maximum combo */
    maxCombo: number;
    /** Beatmap's difficulty/star rating */
    stars: number;
    /** Beatmap status */
    status: BeatmapsetOnlineStatus;
    /** Beatmap URL */
    url: string;
    /** Beatmap version, also known as difficulty name */
    version: string;

    /** Whether or not plays on the beatmap can be submitted */
    scoreable: boolean;

    /** Beatmap difficulty information */
    difficulty: BeatmapDifficulty;
    /** Beatmap objects information */
    objects: BeatmapObjects;
    /** Beatmap online statistics */
    statistics: BeatmapStatistics;

    /**
     * Construct a beatmap object
     * @param data Raw beatmap data
     */
    constructor(data: BeatmapObject, client: Client) {
        super(client);

        this.id = data.id;

        this.bpm = data.bpm;
        this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
        this.gamemode = data.mode;
        this.hitLength = data.hit_length;
        this.length = data.total_length;
        this.maxCombo = data.max_combo;
        this.stars = data.difficulty_rating;
        this.status = data.status;
        this.url = data.url;
        this.version = data.version;

        this.scoreable = data.is_scoreable;

        this.difficulty = {
            approachRate: data.ar,
            circleSize: data.cs,
            hpDrain: data.drain,
            overallDifficulty: data.accuracy
        };
        this.objects = {
            circles: data.count_circles,
            sliders: data.count_sliders,
            spinners: data.count_spinners
        };
        this.statistics = {
            passCount: data.passcount,
            playCount: data.playcount
        };
    }
}

export type BeatmapDifficulty = {
    /** Beatmap's approach rate (ar) */
    approachRate: number;
    /** Beatmap's circle size (cs) */
    circleSize: number;
    /** Beatmap's HP drain (hp) */
    hpDrain: number;
    /** Beatmap's overall difficulty (od) */
    overallDifficulty: number;
};

export type BeatmapObjects = {
    /** Number of circles in the beatmap */
    circles: number;
    /** Number of sliders in the beatmap */
    sliders: number;
    /** Number of spinners in the beatmap */
    spinners: number;
};

export type BeatmapStatistics = {
    /** Number of submitted plays which fully completed the beatmap */
    passCount: number;
    /** Number of submitted plays */
    playCount: number;
};
