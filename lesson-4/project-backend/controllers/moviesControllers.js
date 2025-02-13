import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

export const getMovies = async (req, res)=> {
    const result = await moviesServices.getMovies();

    res.json(result);
}

export const getMovieById = async(req, res)=> {
    const {id} = req.params;
    const result = await moviesServices.getMovieById(id);
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
        // const error = new Error(`Movie with id=${id} not found`);
        // error.status = 404;
        // throw error;
        // return res.status(404).json({
        //     message: `Movie with id=${id} not found`
        // })
    }

    res.json(result);
}

export const addMovie = async(req, res)=> {
    const result = await moviesServices.addMovie(req.body);

    res.status(201).json(result);
}

export const updateMovieById = async(req, res)=> {
    const {id} = req.params;
    const result = await moviesServices.updateMovieById(id, req.body);
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

export const deleteMovieById = async(req, res)=> {
    const {id} = req.params;
    const result = await moviesServices.deleteMovieById(id);
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send();

    res.json(result);
}