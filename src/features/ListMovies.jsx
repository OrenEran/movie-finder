import React from 'react';
import ItemMovie from './ItemMovie';

const ListMovies = ({ movies }) => {
  return (
    <div className='row'>
      {movies.map(movie => (
        <ItemMovie
          key={movie.imdbID}
          title={movie.Title}
          image={movie.Poster}
          year={movie.Year}
          id={movie.imdbID}
        />
      ))}
    </div>
  );
};

export default ListMovies;
