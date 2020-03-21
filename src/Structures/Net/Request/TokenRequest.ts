import { Enums } from "../../../";
import { BaseRequest } from "./BaseRequest";

/**
 * A token request
 * @extends BaseRequest
 */
export interface TokenRequest extends BaseRequest {
    body: {
        /** Token grant type */
        grant_type: Enums.GrantType,
        /** OAuth Client ID */
        client_id: string,
        /** OAuth Client secret */
        client_secret: string,

        /** Refresh token for RefreshToken Grant Type */
        refresh_token?: string,

        /** Authorization code for AuthCode Grant Type */
        code?: string,
        /** Redirect URI for AuthCode Grant Type (currently of no use, but required) */
        redirect_uri?: string
    };
}