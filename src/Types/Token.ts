import { TokenType } from "../Enums";

/** OAuth Token */
export type Token = {
    /** Type of token */
    token_type: TokenType;
    /** Time in seconds after which the access token will be expired */
    expires_in: number;
    /** The access token */
    access_token: string;
    /** The (new) refresh token */
    refresh_token: string;
};