import { BeatmapApproval, RecentActivityType, ScoreRank, GameMode } from "../../Enums";

/**
 * **RecentActivity**
 * - **Untested**
 * - References:
 *   - Response sample from `/api/v2/users/{user}/recent_activity`
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIRecentActivity.cs}
 */
export interface RecentActivity {
    id: number;
    achievement?: RecentActivityAchievement;
    approval?: BeatmapApproval;
    beatmap?: RecentActivityBeatmap;
    beatmapset?: RecentActivityBeatmap;
    count?: number;
    createdAt: number;
    mode?: GameMode;
    rank?: number;
    scoreRank?: ScoreRank;
    type: RecentActivityType;
    user: RecentActivityUser;
}

interface RecentActivityAchievement {
    id: number;
    description: string;
    grouping: string;
    icon_url: string;
    instructions: string | null;
    mode: string | null;
    name: string;
    ordering: number;
    slug: string;
}

interface RecentActivityBeatmap {
    title: string;
    url: string;
}

interface RecentActivityUser {
    previousUsername: string;
    username: string;
    url: string;
}