import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RecipeCreate from "./pages/create/RecipeCreate";
import RecipeDetail from "./pages/detail/RecipeDetail";
import RecipeSearch from "./pages/search/RecipeSearch";
import Home from "./pages/home/Home";
import MainLayout from "./layouts/MainLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipes", element: <Home /> },
      { path: "/create", element: <RecipeCreate /> },
      { path: "/recipes/:id", element: <RecipeDetail /> },
      { path: "/search", element: <RecipeSearch /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
