/**
 * **Kudosu**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIKudosuHistory.cs}
 *   - Response sample from `api/v2/users/{user}/kudosu
 */
export interface Kudosu {
    id: number;
    action: string;
    amount: number;
    created_at: string;
    /** Unknown */
    details: {};
    giver: KudosuGiver | null;
    /** Possible enum */
    model: string;
    post: ModdingPost;
}

interface ModdingPost {
    url: string;
    title: string;
}

interface KudosuGiver {
    url: string;
    username: string;
}