import { Base, Instance } from "@Structures";
import {
    KudosuHistory as KudosuHistoryObject,
    RecentActivity as RecentActivityObject,
    User as UserObject,
    UserCompact as UserCompactObject
} from "@Types";
import {
    BeatmapApproval,
    Gamemode,
    KudosuAction,
    Playstyle,
    RecentActivityType,
    ScoreRank
} from "@Enums";

/** Represents a User class */
export class User extends Base {
    /** Raw data object */
    public raw: UserObject | UserCompactObject;
    /** Whether or not this user class is fully populated (to populate, call {@link fetch}) */
    public isPopulated: boolean;

    /** The user's ID */
    public id: number;
    /** The user's username */
    public username: string;
    /** The user's avatar URL */
    public avatarURL: string;
    /** The user's last login Date */
    public lastLogin?: Date;
    /** Whether or not the user is still active */
    public active: boolean;
    /** Whether or not the user is a bot */
    public bot: boolean;
    /** Whether or not the user is online */
    public online: boolean;
    /** Whether or not the user once had supporter */
    public hadSupporter?: boolean;
    /** Whether or not the user is currently a supporter */
    public supporter: boolean;
    /** The user's supporter level (the amount of hearts on the user's page) */
    public supporterLevel: number;
    /** Whether or not the user has blocked PMs from non-friends */
    public pmFriendsOnly: boolean;
    /** The user's country */
    public country: {
        /** Country code */
        code: string;
        /** Country name */
        name: string;
    };
    /** The user's cover image */
    public cover: {
        /** Whether or not the cover is a custom image */
        custom: boolean;
        /** The cover image url */
        url: string;
    };

    /** The user's default gamemode */
    public defaultGamemode?: Gamemode;
    /** The user's follower count */
    public followers?: number;
    /** The user's playstyle */
    public playstyle?: Playstyle[];
    /** The user's previous usernames */
    public previousUsernames?: string[];
    /** The user's title */
    public title?: string;

    /** The user's badges */
    public badges?: UserBadge[];
    /** The user's group badge */
    public groupBadge?: UserGroupBadge;
    /** The user's infractions */
    public infractions?: UserInfraction[];
    /** The user's kudosu information */
    public kudosu?: UserKudosu;
    /** The user's personal information */
    public info?: UserInfo;
    /** The user's earned medals */
    public medals?: UserMedal[];
    /** The user's rank history */
    public rankHistory?: UserRankHistory;
    /** The user's gameplay statistics */
    public statistics?: UserStatistics;

    /**
     * Construct a user object
     * @param data Raw user data
     * @param instance Instance that created this user object
     */
    constructor(data: UserObject | UserCompactObject, instance: Instance) {
        super(instance);

        this.raw = data;
        this.isPopulated = (data as UserObject).kudosu ? true : false; //Checking if this is compact or not, should probably go for a better one
        this.id = data.id;
        this.username = data.username;
        this.avatarURL = data.avatar_url;
        this.active = data.is_active;
        this.bot = data.is_bot;
        this.online = data.is_online;
        this.supporter = data.is_supporter;
        this.supporterLevel = data.support_level;
        this.pmFriendsOnly = data.pm_friends_only;
        this.country = data.country;
        this.cover = {
            custom: data.cover.custom_url ? true : false,
            url: data.cover.url
        };

        if (data.last_visit)
            this.lastLogin = new Date(data.last_visit);

        if (this.isPopulated)
            this.populate();
    }

    /**
     * Fully fetch and update this user
     */
    public async fetch() {
        const newUser = await this.instance.client.getUser(this.instance, this.id, this.defaultGamemode, true);
        this.raw = newUser;
        this.createdAt = new Date();
        this.populate();
    }

    private populate() {
        const data = this.raw as UserObject;
        this.hadSupporter = data.has_supported;
        this.defaultGamemode = data.playmode;
        this.followers = data.follower_count;
        this.playstyle = data.playstyle || [];
        this.previousUsernames = data.previous_usernames;
        this.title = data.title || "";

        this.kudosu = data.kudosu;
        this.rankHistory = data.rankHistory;
        this.info = {
            interests: data.interests,
            location: data.location,
            occupation: data.occupation,

            discord: data.discord,
            lastfm: data.lastfm,
            skype: data.skype,
            twitter: data.twitter,
            website: data.website
        };
        this.statistics = {
            accuracy: data.statistics.hit_accuracy,
            grades: data.statistics.grade_counts,
            hitCount: data.statistics.total_hits,
            level: data.statistics.level.current,
            levelProgress: data.statistics.level.progress,
            maxCombo: data.statistics.maximum_combo,
            playcount: data.statistics.play_count,
            playtime: data.statistics.play_time,
            pp: data.statistics.pp,
            ranked: data.statistics.is_ranked,
            rankGlobal: data.statistics.rank.global || data.statistics.pp_rank,
            rankCountry: data.statistics.rank.country,
            scoreRanked: data.statistics.ranked_score,
            scoreTotal: data.statistics.total_score,
            watchedReplays: data.statistics.replays_watched_by_others
        };

        this.badges = data.badges.map<UserBadge>(i => ({
            description: i.description,
            imageURL: this.avatarURL,
            timestamp: new Date(i.awarded_at)
        }));
        this.infractions = data.account_history.map<UserInfraction>(i => ({
            description: i.description,
            length: i.length,
            timestamp: new Date(i.timestamp),
            type: i.type
        }));
        this.medals = data.user_achievements.map<UserMedal>(i => ({
            id: i.achievement_id,
            timestamp: new Date(i.achieved_at)
        }));

        if (data.group_badge)
            this.groupBadge = {
                colour: data.group_badge.colour,
                description: data.group_badge.description,
                identifier: data.group_badge.identifier,
                name: data.group_badge.name,
                shortName: data.group_badge.short_name
            };
        else
            this.groupBadge = undefined;
    }

    /** Serialize a minimal user object into a {@link MinimalUser} */
    public static serializeMinimalUser(data: { url: string; username: string }) {
        return {
            id: parseInt(data.url.split("/").pop() as string),
            username: data.username
        };
    }

    /** Serialize a KudosuObject into a {@link UserKudosuHistory} */
    public static serializeKudosuHistory(data: KudosuHistoryObject): UserKudosuHistory {
        const serialized: UserKudosuHistory = {
            id: data.id,
            timestamp: new Date(data.created_at),
            action: data.action,
            amount: data.amount
        };
        if (data.giver)
            serialized.giver = this.serializeMinimalUser(data.giver);
        return serialized;
    }

    /** Serialize a RecentActivityObject into a {@link UserRecentActivity} */
    public static serializeRecentActivity(data: RecentActivityObject): UserRecentActivity {
        const { createdAt, user, ...filtered } = data;
        return {
            ...filtered,
            timestamp: new Date(createdAt),
            user: this.serializeMinimalUser(user)
        };
    }
}

/** A very minimal user object */
export interface MinimalUser { //TODO: remove this with a caching handler
    /** The user's ID */
    id: number;
    /** The user's username */
    username: string;
}

/** A user's badges */
export interface UserBadge {
    /** The badge's description */
    description: string;
    /** The badge's image URL */
    imageURL: string;
    /** When the badge was awarded to the user */
    timestamp: Date;
}

/** A user's grades */
export interface UserGrades {
    /** The user's total SS+ ranks */
    ssh: number;
    /** The user's total SS ranks */
    ss: number;
    /** The user's total S+ ranks */
    sh: number;
    /** The user's total S ranks */
    s: number;
    /** The user's total A ranks */
    a: number;
}

/** The user's group badge */
export interface UserGroupBadge {
    /** The badge's color in hexadecimal format */
    colour: string;
    /** The badge's description */
    description: string;
    /** The badge's identifier */
    identifier: string;
    /** The badge's name */
    name: string;
    /** The badge's short name */
    shortName: string;
}

/** A user's personal information */
export interface UserInfo {
    /** The user's interests */
    interests: string | null;
    /** The user's location */
    location: string | null;
    /** The user's occupation */
    occupation: string | null;

    /** The user's discord */
    discord: string | null;
    /** The user's lastfm */
    lastfm: string | null;
    /** The user's skype */
    skype: string | null;
    /** The user's twitter */
    twitter: string | null;
    /** The user's website */
    website: string | null;
}

/** A user's infraction */
export interface UserInfraction {
    /** The infraction's description */
    description: string;
    /** The infraction type */
    type: string; //TODO: enumerate this
    /** When the infraction occurred */
    timestamp: Date;
    /** How long the infraction lasts in seconds */
    length: number;
}

/** A user's kudosu information */
export interface UserKudosu {
    /** The user's available kudosu */
    available: number;
    /** The user's total kudosu */
    total: number;
}

/** A user's kudosu history entry */
export interface UserKudosuHistory {
    /** The entry ID */
    id: number;
    /** When the kudosu entry occurred */
    timestamp: Date;
    /** The entry action */
    action: KudosuAction;
    /** The entry kudosu amount */
    amount: number;
    /** The user that gave the kudosu, if applicable */
    giver?: MinimalUser;
}

/** A user's earned medals */
export interface UserMedal { //TODO: enum all medals (**maybe**)
    /** The medal ID */
    id: number;
    /** When the medal was awarded to the user */
    timestamp: Date;
}

/** A user's rank history */
export interface UserRankHistory {
    /** The rank history's gamemode */
    mode: Gamemode;
    /** The rank history's data, where each index increment means a day has passed */
    data: number[];
}

export interface UserRecentActivity {
    /** The activity ID */
    id: number;
    /** When the activity occurred */
    timestamp: Date;
    /** The activity type */
    type: RecentActivityType;
    /** Very compact user information included with activity */
    user: MinimalUser;

    /** Approval type included with activity */
    approval?: BeatmapApproval;
    /** Minimal beatmap information incuded with activity */
    beatmap?: UserRecentActivityBeatmap;
    /** Minimal beatmapset information incuded with activity */
    beatmapset?: UserRecentActivityBeatmap;
    /** Count included with activity */
    count?: number;
    /** Medal included with activity */
    medal?: UserRecentActivityMedal;
    /** Mode which the activity occurred in */
    mode?: Gamemode;
    /** Rank included with activity */
    rank?: number;
    /** Score rank included with activity */
    scoreRank?: ScoreRank;
}

/** Minimal beatmap/beatmapset information incuded with an activity */
export interface UserRecentActivityBeatmap {
    /** The beatmap/beatmapset title/name */
    title: string;
    /** The beatmap/beatmapset URL **path** */
    url: string;
}

/** Medal included with an activity */
export interface UserRecentActivityMedal {
    /** The medal ID */
    id: number;
    /** The medal's description */
    description: string;
    /** The medal's group */
    grouping: string;
    /** The medal's icon URL */
    icon_url: string;
    /** Instructions to earn the medal, if given */
    instructions: string | null;
    /** The medal's mode, if mode-specific */
    mode: string | null;
    /** The medal's name */
    name: string;
    /** The medal's order */
    ordering: number;
    /** The medal's slug */
    slug: string;
}

/** A user's gameplay statistics */
export interface UserStatistics {
    /** The user's accuracy in percentage */
    accuracy: number;
    /** The user's grades */
    grades: UserGrades;
    /** The user's total circle hits */
    hitCount: number;
    /** The user's level */
    level: number;
    /** The user's progress to the next level in percentage */
    levelProgress: number;
    /** The user's highest combo */
    maxCombo: number;
    /** The user's total playcount */
    playcount: number;
    /** The user's playtime in seconds */
    playtime: number;
    /** The user's performance points */
    pp: number;
    /** Whether or not the user is ranked */
    ranked: boolean;
    /** The user's global rank by performance points */
    rankGlobal: number;
    /** The user's country rank by performance points */
    rankCountry: number | null;
    /** The user's ranked score */
    scoreRanked: number;
    /** The user's total score */
    scoreTotal: number;
    /** The user's total replay watch count */
    watchedReplays: number;
}