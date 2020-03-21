/**
 * **ChatChannel**
 * - References:
 *   - {@link https://osu.ppy.sh/docs/index.html#chatchannel}
 */
export interface ChatChannel {
    channel_id: number;
    name: string;
    description: string | null;
    icon?: string;
    type: string;
    last_read_id?: number | null;
    last_message_id?: number | null;
    users?: number[] | null;
}