const Header = ({ query, setQuery, handleSearch }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm p-4">
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
  );
};

export default Header;
