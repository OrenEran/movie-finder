import axios from "axios";

const API_KEY = 'a80ef238';
const BASE_URL = 'https://www.omdbapi.com/';

const callApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

const getMovies = (query) => {
    const url = `${BASE_URL}?${query}&apikey=${API_KEY}`;
    return callApi(url);
};

// Get movies by title
const getMoviesByTitle = (title, year, type, page = 1) => {
    let query = `s=${title}&page=${page}`;
    if (year) query += `&y=${year}`;
    if (type) query += `&type=${type}`;
    return getMovies(query);
};

// Get movie details by IMDb ID
const getMovieDetails = (id) => {
    const query = `i=${id}`;
    return getMovies(query);
};

// Get series by title
const getSeriesByTitle = (title) => {
    const query = `t=${title}&type=series`;
    return getMovies(query);
};

// Get episode by series ID, season, and episode number
const getEpisodeDetails = (seriesId, season, episode) => {
    const query = `i=${seriesId}&Season=${season}&Episode=${episode}`;
    return getMovies(query);
};

export { getMovies, getMoviesByTitle, getMovieDetails, getSeriesByTitle, getEpisodeDetails };
