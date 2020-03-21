import { UserCompact } from "./UserCompact";

/**
 * **ChatMessage**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#chatmessage}
 */
export interface ChatMessage {
    message_id: number;
    sender_id: number;
    channel_id: number;
    timestamp: string;
    content: string;
    is_action: boolean;
    sender: UserCompact;
}