import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AppPage from './pages/AppPage'
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
      </Route>
    )
  );

  return (
    <div className="min-h-screen scroll-smooth">
      <RouterProvider router={router} />
    </div>
  );
};

export default App
