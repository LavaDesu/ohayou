import { Client, Endpoints, RequestHandler } from "..";
import { GrantType, RequestType, TokenType } from "../Enums";
import { Token } from "../Types";
import { User } from "../Structures";
import { Instance } from "./Instance";

export class ClientInstance extends Instance {
    constructor(client: Client, token: Token) {
        super(client, token);
    }

    /** Refresh this instance's token */
    public async refresh(): Promise<this> {
        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);

        const response = await this.client.requestHandler.request<Token>({
            body: {
                "grant_type": GrantType.ClientCredentials,
                "client_id": this.client.clientID,
                "client_secret": this.client.clientSecret,
                "scope": "public"
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });

        this.type = response.token_type;
        this.accessToken = response.access_token;

        this.refreshTimer = setTimeout(this.refresh.bind(this), (response.expires_in - 100) * 1000);

        return this;
    }
}