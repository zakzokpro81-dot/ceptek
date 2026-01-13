import { Create } from "./pages/create/Create.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Root } from "./pages/Root.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="create" element={<Create />} />

    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />


  );
}

export default App;