import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "bogdan@gmail.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvZ2RhbkBnbWFpbC5jb20iLCJpYXQiOjE3NDA1MDk2MTYsImV4cCI6MTc0MDU5NjAxNn0.JeEX8ac5Omlx4_uecQoWy9cGv1n588YWMS6dkCWDXE7";
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email)
}
catch(error) {
    console.log(error.message);
}