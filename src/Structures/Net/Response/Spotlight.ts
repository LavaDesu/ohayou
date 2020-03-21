/**
 * **Spotlight**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#spotlight}
 */
export interface Spotlight {
    end_date: string;
    id: number;
    /** The official docs seem to mistype this as number */
    mode_specific: boolean;
    participant_count: number | null;
    /** The official docs seem to mistype this as number */
    name: string;
    start_date: string;
    type: string; //TODO: SpotlightType enum
}