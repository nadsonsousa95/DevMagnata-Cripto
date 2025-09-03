import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Detail } from "./pages/Detail/Detail";
import { NotFound } from "./pages/NotFound/404";
import { Layout } from "./components/Layout/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [{
            path: "/",
            element: <Home />,
            errorElement: <NotFound />,
        },
        {
            path: "/detail/:cripto",
            element: <Detail />,
        },
        {
            path: "*",
            element: <NotFound />,
        }]
    }
  
]);