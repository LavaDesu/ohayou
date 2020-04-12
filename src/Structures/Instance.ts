import { Client } from "../Client";
import { TokenType } from "../Enums";
import { Token as TokenObject } from "./API";
import { User } from "./User";

/**
 * Represents a OAuth user instance to perform authenticated requests with
 */
export class Instance {
    private refreshTimer?: NodeJS.Timeout;
    private accessToken?: string;

    public client: Client;
    public refreshToken?: string;
    public type?: TokenType;
    public user?: User;

    constructor(client: Client) {
        this.client = client;
    }

    public async refresh(data: TokenObject): Promise<Instance> {
        this.type = data.token_type;
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;

        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);
        this.refreshTimer = setTimeout(async () => {
            const newToken = await this.client.getTokenFromRefresh(this.refreshToken as string);
            this.refresh(newToken);
        }, (data.expires_in - 100) * 1000);

        this.user = await this.client.getSelf(this);
        return this;
    }

    public getToken() {
        return `${this.type} ${this.accessToken}`;
    }
}