const Movie = ({ movie }) => {
  return (
    <div className="object cover w-full h-full">
      <img
        src={movie.Poster}
        alt=""
        className="object-cover w-full h-96 rounded"
      />
      <h1 className="text-lg text-white">{movie.Title}</h1>
    </div>
  );
};

export default Movie;
