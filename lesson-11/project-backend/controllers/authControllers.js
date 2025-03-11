import * as authServices from "../services/authServices.js";

export const signup = async(req, res)=> {
    const result = await authServices.signupUser(req.body);

    res.status(201).json({
        username: result.username,
        email: result.email,
    })
}

export const resendVerify = async(req, res)=> {
    const {email} = req.body;
    await authServices.resendVerifyEmail(email);

    res.json({
        message: "Verify email send successfully"
    })
}

export const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    await authServices.verifyUser(verificationCode);

    res.json({
        message: "Email verified successfully"
    })
}

export const signin = async(req, res)=> {
    const result = await authServices.siginUser(req.body);

    res.json({
        token: result.token,
    })
}

export const getCurrent = async(req, res)=> {
    const {email, username} = req.user;

    res.json({
        email,
        username,
    })
}

export const signout = async(req, res)=> {
    const {id} = req.user;
    await authServices.signoutUser({id});

    res.json({
        message: "Signout successfully"
    })
}