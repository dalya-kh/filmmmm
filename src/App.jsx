


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [da, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movietosearch, setMovietosearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: 'acc08b205f3ccc0047094f5a391876cc',
              sort_by: 'popularity.desc',
            },
          }
        );
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }

    fetchData();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const search = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${movietosearch}`
      );

      const searchResults = response.data.results;

      if (searchResults.length > 0) {
        openModal(searchResults[0]);
      } else {
        console.log('No results found.');
      }

      setMovietosearch('');
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <>
      <div className="app container-fluid bg-light">
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-secondary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">MovieDB</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link" href="#">App</a>
                <a className="nav-link" href="#">Trending</a>
              </div>
            </div>
            <form className="d-flex justify-content-end" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={movietosearch} onChange={(e) => setMovietosearch(e.target.value)}/>
              <button className="btn btn-secondary" type="submit" onClick={search}>Search</button>
            </form>
          </div>
        </nav>
        <div className="cardsContainer w-100 h-100 bg-light row overflow-auto p-5 d-flex justify-content-between">
          {
            da.map(
              (movie) => (
                <div className="card m-4 border border-dark" style={{ width: '18rem' }} key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <button className="btn btn-dark " onClick={() => openModal(movie)}>
                  Show Overview
                </button>
                  </div>
                </div>
              )
            )
          }
        </div>
        {selectedMovie && (
        <div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.title}</h5>
              </div>
              <div className="modal-body">
                {selectedMovie.overview}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>  );
}

export default App;
