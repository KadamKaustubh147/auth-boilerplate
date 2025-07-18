import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import NewPass from "./pages/NewPass";

import { AuthProvider } from "./context/AuthContext"; // ✅ FIXED

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/newpass" element={<NewPass />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <div className="min-h-screen scroll-smooth">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
