import { KudosuAction } from "../../Enums";

/**
 * **Kudosu**
 * - **Undocumented**
 * - References:
 *   - {@link https://github.com/ppy/osu/blob/master/osu.Game/Online/API/Requests/Responses/APIKudosuHistory.cs}
 *   - Response sample from `api/v2/users/{user}/kudosu
 */
export interface KudosuHistory {
    id: number;
    action: KudosuAction;
    amount: number;
    created_at: string;
    /** Unknown */
    details: {};
    giver: KudosuGiver | null;
    /** Possible enum */
    model: string;
    post: ModdingPost;
}

interface KudosuGiver {
    url: string;
    username: string;
}

interface ModdingPost {
    url: string;
    title: string;
}