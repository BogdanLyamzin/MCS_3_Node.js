import fs from "node:fs/promises";

import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

import cloudinary from "../helpers/cloudinary.js";

export const getMovies = async (req, res)=> {
    const {id: owner} = req.user;
    const result = await moviesServices.getMovies({owner});

    res.json(result);
}

export const getMovieById = async(req, res)=> {
    const {id} = req.params;
    const {id: owner} = req.user;
    const result = await moviesServices.getMovie({id, owner});
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

export const addMovie = async(req, res)=> {
    let poster = null;
    if(req.file) {
        const {url} = await cloudinary.uploader.upload(req.file.path, {
            folder: "posters",
            use_filename: true,
        });
        poster = url;
        await fs.unlink(req.file.path);
    }

    const {id: owner} = req.user;
    const result = await moviesServices.addMovie({...req.body, poster, owner});

    res.status(201).json(result);
}

export const updateMovieById = async(req, res)=> {
    const {id} = req.params;
    const {id: owner} = req.user;
    const result = await moviesServices.updateMovie({id, owner}, req.body);
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

export const deleteMovieById = async(req, res)=> {
    const {id} = req.params;
    const {id: owner} = req.user;
    const result = await moviesServices.deleteMovie({id, owner});
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send();

    res.json({
        message: "Delete successfully"
    });
}