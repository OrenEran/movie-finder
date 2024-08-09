import React, { useState } from 'react';
import { getMovieDetails } from './apiServices';

function ItemMovie({ title, image, year, id }) {
    const [details, setDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = async () => {
        if (!showDetails) {
            const data = await getMovieDetails(id);
            setDetails(data);
        } else {
            setDetails(null);
        }
        setShowDetails(!showDetails);
    };

    return (
        <div className='col-md-4 d-flex align-items-stretch mb-4'>
            <div className='card'>
                <img src={image} alt={title} className='card-img-top' />
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>{title}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>Released in {year}</h6>
                    <button className='btn btn-info mt-auto' onClick={handleToggleDetails}>
                        {showDetails ? 'Less Details' : 'More Details'}
                    </button>
                    {showDetails && details && (
                        <div className='mt-3'>
                            <p><strong>Director:</strong> {details.Director}</p>
                            <p><strong>Actors:</strong> {details.Actors}</p>
                            <p><strong>Plot:</strong> {details.Plot}</p>
                            <p><strong>Genre:</strong> {details.Genre}</p>
                            <p><strong>Runtime:</strong> {details.Runtime}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemMovie;
