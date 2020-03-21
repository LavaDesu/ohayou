import { BeatmapSet } from "./BeatmapSet";
import { UserStatistics } from "./UserStatistics";
import { Spotlight } from "./Spotlight";

/**
 * **RankingResponse**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#ranking-response}
 */
export interface RankingResponse {
    beatmapsets: BeatmapSet[] | null;
    /** **Unclear** */
    cursor: object;
    ranking: UserStatistics[];
    spotlight: Spotlight | null;
    total: number;
}