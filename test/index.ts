import { Client } from "../src";
import "mocha";
import { expect } from "chai";
import { Token } from "../src/Structures/Token";

const ohayou = new Client(parseInt(process.env.CLIENT_ID), process.env.CLIENT_SECRET);
let token: Token;

describe("Osu", () => {
    describe("Client", () => {
        before(async () => {
            token = await ohayou.createToken(process.env.REFRESH_TOKEN, "refresh");

            console.log(token.refreshToken);
        });

        it("should username = -Lava", async () => {
            const res = await ohayou.getSelf(token);
            // console.log(res);
            expect(res.username).to.equal("-Lava");
        });

        it("should typeof array", async () => {
            const res = await ohayou.getFriends(token);
            // console.log(res);
            expect(res).to.be.an("array");
        });

        it("should username = peppy", async () => {
            const res = await ohayou.getUser(2, token);
            // console.log(res);
            expect(res.username).to.equal("peppy");
        });
    });
});