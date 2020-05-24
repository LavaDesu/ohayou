import { Client } from "@Client";
import { GrantType, TokenType, RequestType } from "@Enums";
import { Token } from "@Types";
import { User } from "@Structures";
import { RequestHandler } from "@RequestHandler";
import { Endpoints } from "@Endpoints";

/**
 * Represents a OAuth user instance to perform authenticated requests with
 */
export class Instance {
    private refreshTimer?: NodeJS.Timeout;
    private accessToken: string;

    public client: Client;
    public refreshToken: string;
    public type: TokenType;
    public user?: User;

    constructor(client: Client, token: Token) {
        this.client = client;

        this.type = token.token_type;
        this.accessToken = token.access_token;
        this.refreshToken = token.refresh_token;
    }

    public async refresh(): Promise<this> {
        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);

        const response = await RequestHandler.request<Token>({
            body: {
                "grant_type": GrantType.RefreshToken,
                "client_id": this.client.clientID,
                "client_secret": this.client.clientSecret,
                "refresh_token": this.refreshToken
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });

        this.type = response.token_type;
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;

        this.refreshTimer = setTimeout(this.refresh.bind(this), (response.expires_in - 100) * 1000);

        this.user = await this.client.getSelf(this);
        return this;
    }

    public getToken() {
        return `${this.type} ${this.accessToken}`;
    }
}