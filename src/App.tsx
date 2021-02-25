import './App.css'
import React, { useReducer, useEffect } from 'react'
import GlobalHeader from './views/components/GlobalHeader'
import Movie from './views/components/Movie'
import Search from './views/components/Search'

const API = 'https://www.omdbapi.com/?s=man&apikey=2d324c44'

const initialState = {
  loding: true,
  movies: [],
  errorMessage: null,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      }
    default:
      return state
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search,
        })
      })
  }, [])

  const search = (searchValue: any) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=2d324c44`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            payload: jsonResponse.Error,
          })
        }
      })
  }

  const { movies, errorMessage, loading } = state

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
          movies.map((movie: any, index: any) => (
            <Movie key={`${index}-${(movie as any).title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
