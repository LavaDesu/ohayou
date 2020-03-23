/**
 * **Notification**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#notification78}
 */
export interface Notification {
    id: number;
    created_at: string;
    /** Official docs are very unclear about this */
    details?: any;
    is_read: boolean;
    name: string;
    object_type: string;
    object_id: number;
    source_user_id: number | null;
}