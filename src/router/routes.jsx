import Layout from "../Layout";
import App from "../App";
import Scores from "../Scores";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "/scores", element: <Scores /> },
    ],
  },
];

export default routes;
