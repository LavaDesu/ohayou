import { RecentActivityType, ScoreRank, BeatmapApproval } from "../../../Enums";

/**
 * **RecentActivity**
 * - **Untested**
 * - Reference:
 *   - Response sample from `/api/v2/users/{user}/recent_activity`
 *   - {@link https://github.com/ppy/osu/osu.Game/Online/API/Requests/Responses/APIRecentActivity.cs}
 */
export interface RecentActivity {
    id: number;
    createdAt: number;
    type: RecentActivityType;
    scoreRank: ScoreRank;
    rank: number;
    approval: BeatmapApproval;
    count: number;
    mode: string;
    beatmap: RecentActivityBeatmap;
    beatmapset: RecentActivityBeatmap;
    user: RecentActivityUser;
    achievement: RecentActivityAchievement;
}

interface RecentActivityBeatmap {
    title: string;
    url: string;
}

interface RecentActivityUser {
    username: string;
    url: string;
    previousUsername: string;
}

interface RecentActivityAchievement {
    slug: string;
    Nname: string;
}