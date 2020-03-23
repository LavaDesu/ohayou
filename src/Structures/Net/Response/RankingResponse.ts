import { BeatmapSet, Spotlight, UserStatistics } from "./";

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