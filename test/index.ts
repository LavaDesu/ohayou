import "mocha";
import { expect } from "chai";

import { Client, Enums, Instance } from "../src";
import { BeatmapSet, Kudosu, RecentActivity, LegacyScore } from "../src/Structures/API"; //TODO: get rid of this with classes

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.REFRESH_TOKEN)
    throw new Error("Missing credentials");

const ohayou = new Client(parseInt(process.env.CLIENT_ID), process.env.CLIENT_SECRET);
let instance: Instance;

describe("Ohayou!!", () => {
    describe("Client", () => {
        before(async () => {
            instance = await ohayou.createInstance(process.env.REFRESH_TOKEN as string, "refresh");

            console.log(instance.refreshToken);
        });

        describe("User", () => {
            describe("#getUser 2", () => {
                it("mode: default", async () => {
                    const res = await ohayou.getUser(instance, 2);
                    expect(res.username).to.equal("peppy");
                    if (res.rankHistory)
                        expect(res.rankHistory.mode).to.equal(res.defaultGamemode);
                });
                it("mode: Mania", async () => {
                    const res = await ohayou.getUser(instance, 2, Enums.GameMode.Mania);
                    expect(res.username).to.equal("peppy");
                    if (res.rankHistory)
                        expect(res.rankHistory.mode).to.equal(Enums.GameMode.Mania);
                });
            });

            describe("#getUserBeatmapsets 3250792", () => {
                it("type: Favourite", async () => {
                    const res = await ohayou.getUserBeatmapsets(instance, 3250792, Enums.BeatmapSetType.Favourite);
                    expect(res.map((map: BeatmapSet) => map.status)).to.be.an("array").and.to.include.members([ Enums.BeatmapSetOnlineStatus.Ranked ]);
                });
                it("type: Graveyard", async () => {
                    const res = await ohayou.getUserBeatmapsets(instance, 3250792, Enums.BeatmapSetType.Graveyard);
                    expect(res.map((map: BeatmapSet) => map.user_id)).to.be.an("array").and.to.include.members([ 3250792 ]);
                });
                it("type: Loved", async () => {
                    const res = await ohayou.getUserBeatmapsets(instance, 3250792, Enums.BeatmapSetType.Loved);
                    expect(res.map((map: BeatmapSet) => map.user_id)).to.be.an("array").and.to.include.members([ 3250792 ]);
                });
                it("type: RankedAndApproved", async () => {
                    const res = await ohayou.getUserBeatmapsets(instance, 3250792, Enums.BeatmapSetType.RankedAndApproved);
                    expect(res.map((map: BeatmapSet) => map.user_id)).to.be.an("array").and.to.include.members([ 3250792 ]);
                });
            });

            it("#getUserKudosuHistory 3178418", async () => {
                const res = await ohayou.getUserKudosuHistory(instance, 3178418);
                expect(res.map((kudosu: Kudosu) => kudosu.action)).to.be.an("array").and.to.include.members([ "vote.give" ]);
            });

            it("#getUserRecent 4504101", async () => {
                const res = await ohayou.getUserRecent(instance, 4504101);
                expect(res.map((activity: RecentActivity) => activity.user.url)).to.be.an("array").and.to.include.members([ "/u/4504101" ]);
            });

            describe("#getUserScores 5339515", () => {
                it("type: Best", async () => {
                    const res = await ohayou.getUserScores(instance, 5339515, Enums.ScoreType.Best);
                    expect(res.map((score: LegacyScore) => score.user.id)).to.be.an("array").and.to.include.members([ 5339515 ]);
                });
                it("type: Firsts", async () => {
                    const res = await ohayou.getUserScores(instance, 5339515, Enums.ScoreType.Firsts);
                    expect(res.map((score: LegacyScore) => score.user.id)).to.be.an("array").and.to.include.members([ 5339515 ]);
                });
                // it("type: Recent", async () => {
                //     const res = await ohayou.getUserScores(token, 5339515, Enums.ScoreType.Recent);
                //     expect(res.map(score => score.user.id)).to.be.an("array").and.to.include.members([ 5339515 ]);
                // });
            });
        });

        describe("Misc", () => {
            it("#getFriends", async () => {
                const res = await ohayou.getFriends(instance);
                expect(res).to.be.an("array");
            });

            describe("#getSelf", () => {
                it("default mode", async () => {
                    const res = await ohayou.getSelf(instance);
                    expect(res.username).to.equal("-Lava");
                    if (res.rankHistory)
                        expect(res.rankHistory.mode).to.equal(res.defaultGamemode);
                });
                it("mania mode", async () => {
                    const res = await ohayou.getSelf(instance, Enums.GameMode.Mania);
                    expect(res.username).to.equal("-Lava");
                    if (res.rankHistory)
                        expect(res.rankHistory.mode).to.equal(Enums.GameMode.Mania);
                });
            });
        });
    });
});