import { Client } from "../Client";
import { GrantType, TokenType, RequestType } from "../Enums";
import { Token } from "../Types";
import { User } from "../Structures";
import { RequestHandler } from "../RequestHandler";
import { Endpoints } from "../Endpoints";

/**
 * Represents a OAuth user instance to perform authenticated requests with
 */
export abstract class Instance {
    protected refreshTimer?: NodeJS.Timeout;
    protected accessToken: string;

    public client: Client;
    public type: TokenType;

    constructor(client: Client, token: Token) {
        this.client = client;

        this.type = token.token_type;
        this.accessToken = token.access_token;
    }

    /** Refresh this instance's token */
    public abstract refresh(): Promise<this>;

    /**
     * Get a string representing this instance's authentication header
     * @hidden
     */
    public getToken() {
        return `${this.type} ${this.accessToken}`;
    }
}
