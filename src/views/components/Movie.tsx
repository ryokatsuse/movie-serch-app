import React from 'react'
import { MovieTypes } from '../../types/movie'

const defaultImage =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'

type Props = {
  movie: MovieTypes
}

const Movie: React.VFC<Props> = ({ movie }) => {
  const poster = movie.Poster === 'N/A' ? defaultImage : movie.Poster

  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  )
}

export default Movie
