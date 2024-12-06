import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./components/Movie";
import Header from "./components/Header";
import SearchComponent from "./components/SearchComponent";
import Banner from "./assets/images/banner.jpg";

const VITE_BASEURL = import.meta.env.VITE_BASEURL;
const VITE_BASEIMGURL = import.meta.env.VITE_BASEIMGURL;
const VITE_APIKEY = import.meta.env.VITE_APIKEY;
const VITE_TOKEN = import.meta.env.VITE_TOKEN;

const App = () => {
  const [query, setQuery] = useState("");
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const url = debouncedQuery
        ? `${VITE_BASEURL}/search/movie?query=${encodeURIComponent(
            debouncedQuery
          )}&api_key=${VITE_APIKEY}`
        : `${VITE_BASEURL}/movie/popular?api_key=${VITE_APIKEY}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${VITE_TOKEN}`,
        },
      });
      const data = await response.json();

      dispatch({
        type: "INSERT_MOVIES",
        payload: data.results || [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    fetchMovies();
  }, [debouncedQuery]);

  const handleSearch = (input) => {
    setQuery(input);
  };

  if (loading) {
    return (
      <div className="bg-mainColor text-secondColor min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-mainColor text-secondColor min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm p-5">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">Movie App</h1>
          <nav>
            <ul className="flex space-x-6 text-white text-sm font-semibold">
              <li className="cursor-pointer">Genres</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Contact</li>
            </ul>
          </nav>
          <form
            className="flex items-center ml-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="px-3 py-1 rounded-full outline-none text-sm text-black placeholder-gray-500 mr-2"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-1 bg-white text-black rounded-full"
              onClick={() => handleSearch(query)}
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <div className="mt-16 mb-6">
        <img src={Banner} alt="" className="w-full h-auto rounded-md" />
        <h2>cek</h2>
      </div>

      {/* <div className="bg-black py-6 px-10 shadow-xl gap-4 sm:gap-0 text-white">
        <Header title="MovieApp" />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mt-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-wrapper flex flex-col items-center bg-black text-white p-4 rounded-lg shadow-lg"
          >
            <div className="movie-title text-white text-xl font-semibold mb-2">
              {movie.original_title || movie.title}
            </div>
            <img
              className="movie-image w-full h-auto rounded-md mb-3"
              src={`${VITE_BASEIMGURL}${movie.poster_path}`}
              alt={movie.title || "Movie Poster"}
            />
            <div className="movie-date text-gray-400 text-sm mb-1">
              Release: {movie.release_date || "N/A"}
            </div>
            <div className="movie-rating text-yellow-400 text-lg font-semibold">
              Rating: {movie.vote_average || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
