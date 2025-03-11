import HomeScreen from "./screens/home/HomeScreen";
import Problem from "./screens/Problem/Problem";
import Createps from "./screens/createP/Createps";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import P4 from "./screens/Problem/P4";
import Solutions from "./components/solution/Solutions";
import CreateSolution from "./components/solution/CreateSolution";
import Ai from "./screens/ai/Ai";
import Login from "./screens/login/Login";
import Signup from "./screens/signup/SignUp";
import ProfilePage from "./screens/profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "problem/p1",
      element: <Problem />,
    },
    {
      path: "create-problem",
      element: <Createps />,
    },
    {
      path: "problem/:id",
      element: <P4 />,
    },
    {
      path: "problem/solution/:id",
      element: <Solutions />,
    },
    {
      path: "problem/create-solution/:id",
      element: <CreateSolution />,
    },
    {
      path: "ai/",
      element: <Ai />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "profile/:id",
      element: <ProfilePage />,
    },
  ]);
  
  return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
