/**
 * **ChatChannel**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#chatchannel}
 */
export interface ChatChannel {
    channel_id: number;
    description: string | null;
    icon?: string;
    last_message_id?: number | null;
    last_read_id?: number | null;
    name: string;
    type: string;
    users?: number[] | null;
}