import { Base } from "./Base";
import { Instance } from "./Instance";
import { LegacyScore, Beatmap, BeatmapSet, UserCompact } from "./API";
import { GameMode, Mod, ScoreRank } from "../Enums";

export class Score extends Base {
    public raw: LegacyScore;

    /** The score ID */
    public id: number;
    /** The time the score was created */
    public timestamp: Date;
    /** The score accuracy in percentage*/
    public accuracy: number;
    /** The beatmap the score was set on */
    public beatmap: Beatmap;
    /** The beatmapset the score was set on */
    public beatmapset: BeatmapSet;
    /** The highest combo in the score */
    public combo: number;
    /** The score's gamemode */
    public mode: GameMode;
    /** The score's mods */
    public mods: Mod[];
    /** The score's unweighted performance points */
    public pp: number;
    /** The score's rank */
    public rank: ScoreRank;
    /** Whether or not the score's replay is available */
    public replay: boolean;
    /** The score's numeric score */
    public score: number;
    /** The score's statistics */
    public statistics: ScoreStatistics;
    /** The user that scored this score */ //my engrish vocabulary
    public user: UserCompact; //TODO: use user class after implementing a caching handler
    /** The score's weight percentage (only available with {@link Enums.ScoreType.Best}) */
    public weight?: number;
    /** The score's weighted performance points (only available with {@link Enums.ScoreType.Best}) */
    public weightedPP?: number;

    constructor(data: LegacyScore, instance: Instance) {
        super(instance);

        this.raw = data;
        this.id = data.id;
        this.timestamp = new Date(data.created_at);
        this.accuracy = data.accuracy;
        this.beatmap = data.beatmap;
        this.beatmapset = data.beatmapset;
        this.combo = data.max_combo;
        this.mode = data.mode;
        this.mods = data.mods;
        this.pp = data.pp || 0;
        this.rank = data.rank;
        this.replay = data.replay;
        this.score = data.score;
        this.user = data.user;

        this.statistics = {
            c50: data.statistics.count_50,
            c100: data.statistics.count_100,
            c300: data.statistics.count_300,
            geki: data.statistics.count_geki,
            katu: data.statistics.count_katu,
            miss: data.statistics.count_miss
        };

        if (data.weight) {
            this.weight = data.weight.percentage;
            this.weightedPP = data.weight.pp;
        }
    }
}

export interface ScoreStatistics {
    /** Count of 50s */
    c50: number;
    /** Count of 100s */
    c100: number;
    /** Count of 300s */
    c300: number;
    /** Count of gekis */
    geki: number;
    /** Count of katus */
    katu: number;
    /** Count of misses */
    miss: number;
}