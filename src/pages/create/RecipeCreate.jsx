import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

function RecipeCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const ingredientInput = useRef(null);

  const { backgroundColor } = useContext(ThemeContext);
  const color = backgroundColor === "dark" ? "light" : "dark";

  const navigate = useNavigate();

  const { data, postData } = useFetch("http://localhost:3000/recipes", "POST");

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim() !== "" && !ingredients.includes(ingredient)) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient("");
      ingredientInput.current.value = "";
      ingredientInput.current.focus();
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title,
      description,
      ingredients,
      preparation,
      url,
      image,
    };
    postData(recipe);
  };

  useEffect(() => {
    if (data) {
      navigate("/recipes");
    }
  }, [data, navigate]);

  return (
    <div className="d-flex justify-content-left align-items-center mt-3">
      <div
        className={`card p-3 shadow-sm mb-3 border-${color}`}
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="card-header text-center">
          <h3>Create Recipe</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="recipeTitle" className="form-label">
                Recipe Name
              </label>
              <input
                type="text"
                className="form-control"
                id="recipeTitle"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredient" className="form-label">
                Ingredients
              </label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="ingredient"
                  ref={ingredientInput}
                  onChange={(e) => setIngredient(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
              </div>
              <div className="d-flex flex-wrap">
                {ingredients.map((item, index) => (
                  <span
                    key={index}
                    className="badge bg-success me-2 mb-2 d-flex align-items-center"
                    style={{ fontSize: "0.9rem", paddingRight: "0.6rem" }}
                  >
                    {item}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: "0.5rem", marginLeft: "8px" }}
                      onClick={() => handleRemoveIngredient(index)}
                      aria-label="Remove"
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="preparation" className="form-label">
                Preparation
              </label>
              <textarea
                className="form-control"
                id="preparation"
                onChange={(e) => setPreparation(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                Recipe Url
              </label>
              <input
                type="text"
                className="form-control"
                id="url"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecipeCreate;
