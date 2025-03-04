import * as moviesValidations from "../constants/movies.js";

export const getMoviesValidations = (req, res)=> {
    res.json(moviesValidations);
}