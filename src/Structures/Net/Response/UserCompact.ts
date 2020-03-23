/**
 * **UserCompact**
 *
 * - This is a subset of the {@link User} structure, mainly used for embedding in certain responses to save additional api lookups.
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#usercompact}
 */
export interface UserCompact {
    id: number;
    avatar_url: string;
    country_code: string;
    is_active: boolean;
    is_bot: boolean;
    is_online: boolean;
    is_supporter: boolean;
    profile_colour: string;
    username: string;
}