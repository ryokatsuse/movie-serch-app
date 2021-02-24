import './App.css'
import React, { useState, useEffect } from 'react'
import GlobalHeader from './views/components/GlobalHeader'
import Movie from './views/components/Movie'
import Search from './views/components/Search'

const API = 'https://www.omdbapi.com/?s=man&apikey=2d324c44'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search)
        setLoading(false)
      })
  }, [])

  const search = (searchValue: any) => {
    setLoading(true)
    setErrorMessage(null)

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=2d324c44`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search)
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.Error)
          setLoading(false)
        }
      })
  }

  return (
    <div className="App">
      <GlobalHeader text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${(movie as any).title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
