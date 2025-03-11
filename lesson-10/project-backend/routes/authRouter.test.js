import request from "supertest";

import app from "../app.js";

import User from "../db/models/User.js";

describe("test /api/auth/signup", ()=> {
    let server = null;
    beforeAll(()=> {
        server = app.listen(3000);
    })

    afterAll(()=> {
        server.close();
    })

    afterEach(async()=> {
        await User.destroy();
    })

    test("signup with correct data", async ()=> {
        const signupData = {
            username: "Bogdan 2",
            email: "bogdan2@gmail.com",
            password: "123456"
        };

        const {status, body} = await request(app).post("/api/auth/signup").send(signupData);
        expect(status).toBe(201);
        expect(body.username).toBe(signupData.username);
        expect(body.email).toBe(signupData.email);

        const user = await User.findOne({
            where: {
                email: signupData.email
            }
        });

        expect(user).toBeTruthy();
        if(user) {
            await User.destroy({
                where: {
                    email: signupData.email
                }
            })
        }
    })
})