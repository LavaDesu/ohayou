/**
 * **UserCompact**
 *
 * - This is a subset of the {@link User} structure, mainly used for embedding in certain responses to save additional api lookups.
 * - References:
 *   - Response sample from `/api/v2/friends`
 *   - {@link https://osu.ppy.sh/docs/index.html#usercompact}
 */
export interface UserCompact {
    id: number;
    avatar_url: string;
    country: Country;
    country_code: string;
    cover: Cover;
    current_mode_rank?: number;
    is_active: boolean;
    is_bot: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string | null;
    pm_friends_only: boolean;
    profile_colour: string;
    support_level: number;
    username: string;
}

interface Country {
    code: string;
    name: string;
}

interface Cover {
    id: number | null;
    custom_url: string;
    url: string;
}