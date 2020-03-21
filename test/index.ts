import * as Osu from "../src";
import "mocha";
import { expect } from "chai";

const cl = new Osu.Client({
    access_token: process.env.BREAD_ACCESS,
    expires_in: 1,
    refresh_token: "placeholder",
    token_type: Osu.Enums.TokenType.Bearer
});

describe("Osu", () => {
    describe("Client", () => {
        it("should username = -Lava", async () => {
            const res = await cl.getSelf();
            console.log(res);
            expect(res.username).to.equal("-Lava");
        });

        it("should typeof array", async () => {
            const res = await cl.getFriends();
            console.log(res);
            expect(res).to.be.an("array");
        });

        it("should username = peppy", async () => {
            const res = await cl.getUser("2");
            console.log(res);
            expect(res.username).to.equal("peppy");
        });
    });
});