import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import NewPass from "./pages/NewPass";
import { AuthProvider } from "./context/AuthContext-http-jwt";

const RootLayout = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen scroll-smooth">
        {/* This is your outlet for child routes */}
        <Outlet />
      </div>
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
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

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;