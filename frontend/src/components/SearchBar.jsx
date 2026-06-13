function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch
}) {

  const handleSubmit = (e) => {

    e.preventDefault();

    onSearch();

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >

      <input
        type="text"
        placeholder="Search by ticket ID, customer, email, subject..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="
          flex-1
          p-3
          border
          rounded-xl
          bg-white
        "
      />

      <button
        type="submit"
        className="
          px-6
          bg-blue-600
          text-white
          rounded-xl
          hover:bg-blue-700
        "
      >
        Search
      </button>

    </form>

  );
}

export default SearchBar;