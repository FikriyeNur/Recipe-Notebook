import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

function RecipeCard({ recipe }) {
  const { backgroundColor } = useContext(ThemeContext);
  const color = backgroundColor === "dark" ? "light" : "dark";
  return (
    <div key={recipe.id} className="col-md-3 mb-3">
      <div className={`card h-100 border-${color}`}>
        <img
          className="card-img-top"
          src={`img/${recipe.image}`}
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text text-muted" style={{ fontSize: "0.875rem" }}>
            {recipe.description}
          </p>
          <Link
            to={`/recipes/${recipe.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Tarif Detayı
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
