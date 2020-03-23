import { Client } from "../Client";
import { TokenType } from "../Enums";
import { Token as TokenObject } from "./Net/Response";

/**
 * Represents a token class to perform authenticated requests with
 */
export class Token {
    private client: Client;
    private type: TokenType;
    private refreshTimer: NodeJS.Timeout;
    private accessToken: string;

    public refreshToken: string;
    public name: string;

    constructor(data: TokenObject, client: Client) {
        this.client = client;
        this.refresh(data);
    }

    public refresh(data: TokenObject) {
        this.type = data.token_type;
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;

        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);
        this.refreshTimer = setTimeout(async () => {
            const newToken = await this.client.getTokenFromRefresh(this.refreshToken);
            this.refresh(newToken);
        }, (data.expires_in - 100) * 1000);
    }

    public toString() {
        return `${this.type} ${this.accessToken}`;
    }
}