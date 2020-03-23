/**
 * **Kudosu**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIKudosuHistory.cs}
 *   - Response sample from `api/v2/users/{user}/kudosu
 */
export interface Kudosu {
    id: number;
    created_at: string;
    amount: number;
    post: ModdingPost;
    giver: KudosuGiver | null;
    action: string;
    model: string; //unknown
    details: {}; //unknown
}

interface ModdingPost {
    url: string;
    title: string;
}

interface KudosuGiver {
    url: string;
    username: string;
}