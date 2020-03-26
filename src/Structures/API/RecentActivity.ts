import { BeatmapApproval, RecentActivityType, ScoreRank } from "../../Enums";

/**
 * **RecentActivity**
 * - **Untested**
 * - References:
 *   - Response sample from `/api/v2/users/{user}/recent_activity`
 *   - {@link https://github.com/ppy/osu/osu.Game/Online/API/Requests/Responses/APIRecentActivity.cs}
 */
export interface RecentActivity {
    id: number;
    achievement: RecentActivityAchievement;
    approval: BeatmapApproval;
    beatmap: RecentActivityBeatmap;
    beatmapset: RecentActivityBeatmap;
    count: number;
    createdAt: number;
    mode: string;
    rank: number;
    scoreRank: ScoreRank;
    type: RecentActivityType;
    user: RecentActivityUser;
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

interface RecentActivityAchievement {
    name: string;
    slug: string;
}