import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import RecipeCard from "../../components/RecipeCard";
import Pagination from "../../components/Pagination";
import { ThemeContext } from "../../contexts/ThemeContext";

function RecipeSearch() {
  const [searchParams] = useSearchParams();
  const { backgroundColor } = useContext(ThemeContext);
  const textColor = backgroundColor === "dark" ? "light" : "dark";
  const navigate = useNavigate();
  const query = searchParams.get("q");

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const url = `http://localhost:3000/recipes?title_like=${query}&_page=${currentPage}&_limit=${recipesPerPage}`;
  const { data: recipes, isLoading, error, totalCount } = useFetch(url);
  const totalPages = Math.ceil(totalCount / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const hrStyle = {
    borderColor: backgroundColor === "dark" ? "#ccc" : undefined,
  };

  return (
    <div className="row mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className={`text-${textColor}`}>Search Results for "{query}"</h3>
        <button className="btn btn-success mb-2" onClick={() => navigate("/")}>
          Clear Search
        </button>
      </div>
      <hr style={hrStyle} />
      {isLoading && <Loading />}
      {error && <Error error={error} />}
      {recipes && recipes.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No recipes found for <strong>"{query}"</strong>
        </div>
      )}
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default RecipeSearch;
