/**
 * **Spotlight**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#spotlight}
 */
export interface Spotlight {
    id: number;
    end_date: string;
    /** The official docs seem to mistype this as number */
    mode_specific: boolean;
    /** The official docs seem to mistype this as number */
    name: string;
    participant_count: number | null;
    start_date: string;
    type: string; //TODO: SpotlightType enum
}