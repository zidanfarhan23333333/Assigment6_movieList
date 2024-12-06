import { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <input
        type="text"
        value={input}
        placeholder="Search movies..."
        onChange={handleInputChange}
        className="  p-2 pl-4 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-black"
      />
      <button
        onClick={handleSearch}
        className="bg-orange-500 text-white py-2 px-5 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
