import { Instance } from "./Instance";
import { Token } from "../Types/Token";
import { Client, RequestHandler, Endpoints } from "..";
import { GrantType, RequestType } from "../Enums";
import { User } from "./User";

export class UserInstance extends Instance {
    public refreshToken: string;
    public user!: User; //XXX

    constructor(client: Client, token: Token) {
        super(client, token);
        this.refreshToken = token.refresh_token!;
        this.getUser();
    }

    private async getUser() {
        this.user = await this.client.getSelf(this);
    }

    /** Refresh this instance's token */
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
        this.refreshToken = response.refresh_token!;

        this.refreshTimer = setTimeout(this.refresh.bind(this), (response.expires_in - 100) * 1000);
        return this;
    }
}