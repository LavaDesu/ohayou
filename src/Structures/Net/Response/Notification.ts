/**
 * **Notification**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#notification78}
 */
export interface Notification {
    id: number;
    name: string;
    created_at: string;
    object_type: string;
    object_id: number;
    source_user_id: number | null;
    is_read: boolean;
    /** Official docs are very unclear about this */
    details?: any;
}