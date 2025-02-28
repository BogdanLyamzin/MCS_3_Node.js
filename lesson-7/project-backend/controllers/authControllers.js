import * as authServices from "../services/authServices.js";

export const signup = async(req, res)=> {
    const result = await authServices.signupUser(req.body);

    res.status(201).json({
        username: result.username,
        email: result.email,
    })
}

export const signin = async(req, res)=> {
    const result = await authServices.siginUser(req.body);

    res.json({
        token: result.token,
    })
}