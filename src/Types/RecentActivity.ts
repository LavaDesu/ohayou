import {
    BeatmapApproval,
    Gamemode,
    RecentActivityType,
    ScoreRank
} from "../Enums";

export type RecentActivity = {
    id: number;
    achievement?: RecentActivityAchievement;
    approval?: BeatmapApproval;
    beatmap?: RecentActivityBeatmap;
    beatmapset?: RecentActivityBeatmap;
    count?: number;
    createdAt: number; //XXX: camelCase
    mode?: Gamemode;
    rank?: number;
    scoreRank?: ScoreRank;
    type: RecentActivityType;
    user: RecentActivityUser;
};

export type RecentActivityAchievement = {
    id: number;
    description: string;
    grouping: string;
    icon_url: string;
    instructions: string | null;
    mode: string | null;
    name: string;
    ordering: number;
    slug: string;
};

export type RecentActivityBeatmap = {
    title: string;
    url: string;
};

export type RecentActivityUser = {
    previousUsername: string;
    username: string;
    url: string;
};
