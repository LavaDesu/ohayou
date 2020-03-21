/**
 * **Comment**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#comment}
 */
export interface Comment {
    commentable_id: number;
    commentable_type: string;
    created_at: string;
    deleted_at: string | null;
    edited_at: string | null;
    edited_by_id: number | null;
    id: number;
    legacy_name: string | null;
    message: string | null;
    message_html: string | null;
    parent_id: number | null;
    pinned: boolean;
    replies_count: number;
    updated_at: string;
    user_id: number;
    votes_count: number;
}