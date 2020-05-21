import { KudosuAction } from "@Enums";

export type KudosuHistory = {
    id: number;
    action: KudosuAction;
    amount: number;
    created_at: string;
    /** Unknown */
    details: {};
    giver: KudosuGiver | null;
    /** Possible enum */
    model: string;
    post: ModdingPost;
};

export type KudosuGiver = {
    url: string;
    username: string;
};

export type ModdingPost = {
    url: string;
    title: string;
};