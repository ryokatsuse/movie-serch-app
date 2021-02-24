import React from 'react'

const defaultImage =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'

type Props = {
  movie: any
}

const Movie: React.VFC<Props> = ({ movie }) => {
  const poster = movie.poster === 'N/A' ? defaultImage : movie.poster

  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
      </div>
      <p>({movie.year})</p>
    </div>
  )
}

export default Movie
