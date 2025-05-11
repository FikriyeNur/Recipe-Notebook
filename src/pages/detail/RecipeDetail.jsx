import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function RecipeDetail() {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const { data: recipe, isLoading, error } = useFetch(url);

  const { backgroundColor } = useContext(ThemeContext);
  const color = backgroundColor === "dark" ? "light" : "dark";

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    <Error error={error} />;
  }

  return (
    recipe && (
      <div className="container">
        <Link
          to="/recipes"
          className="btn btn-outline-success btn-sm mb-3 fw-bold"
        >
          <i className="bi bi-arrow-left"></i> Tarif Listesi
        </Link>
        <div className={`card shadow-lg p-4 border-${color}`}>
          <div className="row g-4">
            <div
              className="col-md-4 d-flex align-items-start"
              style={{ transform: "translateX(15px)" }}
            >
              <img
                src={`/img/${recipe.image}`}
                alt={recipe.title}
                className="img-fluid rounded"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <h2 className="card-title">{recipe.title}</h2>
              <p className="card-text text-muted small">{recipe.description}</p>
              <hr />
              <h5>Malzemeler</h5>
              <ul className="list-unstyled">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="mb-2">
                    <span className="badge bg-success px-3 py-1">{item}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <h5>Hazırlanışı</h5>
              <p>{recipe.preparation}</p>
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary me-2"
              >
                Tarifi Görüntüle <i className="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RecipeDetail;
