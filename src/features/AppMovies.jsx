import React, { useState } from 'react';
import ListMovies from './ListMovies';
import { getMoviesByTitle, getSeriesByTitle, getEpisodeDetails } from './apiServices';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppMovies = () => {
    const [moviesArr, setMoviesArr] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchType, setSearchType] = useState('');
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const handleSearch = async (page = 1) => {
        let data;
        if (searchType === 'episode') {
            const seriesData = await getSeriesByTitle(searchTerm);
            if (seriesData && seriesData.imdbID) {
                data = await getEpisodeDetails(seriesData.imdbID, season, episode);
                if (data) {
                    setMoviesArr([data]);
                } else {
                    setMoviesArr([]);
                }
            } else {
                setMoviesArr([]);
            }
        } else {
            data = await getMoviesByTitle(searchTerm, searchYear, searchType, page);
            if (data && data.Search) {
                setMoviesArr(data.Search);
                setTotalResults(parseInt(data.totalResults, 10));
            } else {
                setMoviesArr([]);
            }
        }
        setPage(page);
    };

    const handleNextPage = () => {
        if (page * 10 < totalResults) {
            handleSearch(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            handleSearch(page - 1);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Movie Finder</h1>
            <div className='row justify-content-center mb-4'>
                <div className='col-md-6'>
                    <input
                        type='text'
                        className='form-control mb-2'
                        placeholder='Search by title'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input
                        type='text'
                        className='form-control mb-2'
                        placeholder='Search by year'
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                    />
                    <select className='form-control mb-2' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
                        <option value=''>Select Type</option>
                        <option value='movie'>Movie</option>
                        <option value='series'>Series</option>
                        <option value='episode'>Episode</option>
                    </select>
                    {searchType === 'episode' && (
                        <>
                            <input
                                type='text'
                                className='form-control mb-2'
                                placeholder='Season'
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                            />
                            <input
                                type='text'
                                className='form-control mb-2'
                                placeholder='Episode'
                                value={episode}
                                onChange={(e) => setEpisode(e.target.value)}
                            />
                        </>
                    )}
                    <button className='btn btn-primary w-100' onClick={() => handleSearch(1)}>Search</button>
                </div>
            </div>
            <ListMovies movies={moviesArr} />
            {moviesArr.length > 0 && (
                <div className='d-flex justify-content-between align-items-center mt-4'>
                    <button className='btn btn-secondary' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>Page {page}</span>
                    <button className='btn btn-secondary' onClick={handleNextPage} disabled={page * 10 >= totalResults}>Next</button>
                </div>
            )}
        </div>
    );
};

export default AppMovies;
