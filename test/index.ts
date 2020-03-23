import { Client } from "../src";
import "mocha";
import { expect } from "chai";
import { Token } from "../src/Structures/Token";
import { GameMode } from "../src/Enums";

const ohayou = new Client(parseInt(process.env.CLIENT_ID), process.env.CLIENT_SECRET);
let token: Token;

describe("Osu", () => {
    describe("Client", () => {
        before(async () => {
            token = await ohayou.createToken(process.env.REFRESH_TOKEN, "refresh");

            console.log(token.refreshToken);
        });

        describe("#getSelf", () => {
            it("default mode", async () => {
                const res = await ohayou.getSelf(token);
                // console.log(res);
                expect(res.username).to.equal("-Lava");
                if (res.rankHistory)
                    expect(res.rankHistory.mode).to.equal(res.playmode);
            });
            it("mania mode", async () => {
                const res = await ohayou.getSelf(token, GameMode.Mania);
                // console.log(res);
                expect(res.username).to.equal("-Lava");
                if (res.rankHistory)
                    expect(res.rankHistory.mode).to.equal(GameMode.Mania);
            });
        });

        describe("#getUser", () => {
            it("default mode", async () => {
                const res = await ohayou.getUser(token, 2);
                // console.log(res);
                expect(res.username).to.equal("peppy");
                if (res.rankHistory)
                    expect(res.rankHistory.mode).to.equal(res.playmode);
            });
            it("mania mode", async () => {
                const res = await ohayou.getUser(token, 2, GameMode.Mania);
                // console.log(res);
                expect(res.username).to.equal("peppy");
                if (res.rankHistory)
                    expect(res.rankHistory.mode).to.equal(GameMode.Mania);
            });
        });

        it("#getFriends", async () => {
            const res = await ohayou.getFriends(token);
            // console.log(res);
            expect(res).to.be.an("array");
        });
    });
});