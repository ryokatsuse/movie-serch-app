import './App.css'
import React, { useReducer, useEffect } from 'react'
import GlobalHeader from './views/components/GlobalHeader'
import Movie from './views/components/Movie'
import Search from './views/components/Search'
import { MovieTypes } from './types/movie'

const API = 'https://www.omdbapi.com/?s=man&apikey=2d324c44'

interface InitialState {
  loading: boolean
  movies: any
  jsonResponse: any
  errorMessage: string | null | undefined
}

interface AppAction {
  type: ActionType
  payload?: InitialState
  error?: string
}

enum ActionType {
  SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
  SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
}

const initialState: InitialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  jsonResponse: {},
}

const reducer: React.Reducer<InitialState, AppAction> = (
  state: InitialState,
  action: AppAction
) => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }
    case ActionType.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      }
    case ActionType.SEARCH_MOVIES_FAILURE:
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
          type: ActionType.SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search,
        })
      })
  }, [])

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES_REQUEST,
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=2d324c44`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: ActionType.SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search,
          })
        } else {
          dispatch({
            type: ActionType.SEARCH_MOVIES_FAILURE,
            payload: jsonResponse.Error,
          })
        }
      })
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className="App">
      <GlobalHeader text="映画検索" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie: any, index: string) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
