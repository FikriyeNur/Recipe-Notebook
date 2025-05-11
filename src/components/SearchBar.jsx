import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form className="form-inline d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="btn btn-success"
        type="submit"
        disabled={searchTerm.trim() === ""}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
