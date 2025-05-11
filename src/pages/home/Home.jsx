import { useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Pagination from "../../components/Pagination";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const url = `http://localhost:3000/recipes?_page=${currentPage}&_limit=${recipesPerPage}`;
  const { data: recipes, isLoading, error, totalCount } = useFetch(url);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!recipes) return null;
  const totalPages = Math.ceil(totalCount / recipesPerPage);

  return (
    <>
      <div className="row">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            No recipes found.
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Home;
