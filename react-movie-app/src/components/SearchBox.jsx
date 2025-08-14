const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <input
      type="text"
      className="search-input"
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      placeholder="Search for movies..."
    />
  );
};

export default SearchBox;