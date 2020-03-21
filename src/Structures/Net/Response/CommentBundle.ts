import { CommentableMeta } from "./CommentableMeta";
import { Comment } from "./Comment";
import { UserCompact } from "./UserCompact";

/**
 * **CommentableBundle**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#commentbundle}
 */
export interface CommentBundle {
    commentable_meta: CommentableMeta[];
    comments: Comment[];
    has_more: boolean;
    has_more_id: number | null;
    included_comments: Comment[];
    pinned_comments: Comment[];
    sort: string;
    top_level_count: number | null;
    total: number | null;
    user_follow: boolean;
    user_votes: number[];
    users: UserCompact[];
}