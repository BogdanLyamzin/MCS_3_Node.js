import fs from "node:fs/promises";
import path from "node:path";

import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

const postersPath = path.resolve("public", "posters");

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
        const {path: oldPath, filename} = req.file;
        const newPath = path.join(postersPath, filename);
        await fs.rename(oldPath, newPath);
        poster = path.join("posters", filename);
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