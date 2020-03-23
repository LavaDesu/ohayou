import { UserCompact } from "./";

/**
 * **ChatMessage**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#chatmessage}
 */
export interface ChatMessage {
    channel_id: number;
    content: string;
    is_action: boolean;
    message_id: number;
    sender: UserCompact;
    sender_id: number;
    timestamp: string;
}