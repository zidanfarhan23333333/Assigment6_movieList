const movieState = {
  movies: [],
};

const MovieReducer = (state = movieState, action) => {
  switch (action.type) {
    case "INSERT_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default MovieReducer;
