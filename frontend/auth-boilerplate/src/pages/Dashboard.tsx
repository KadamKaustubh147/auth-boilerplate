import { useContext } from "react"
import { AuthContext } from "../context/AuthContext-http-jwt"
import { Navigate } from "react-router-dom"

const AppPage = () => {

  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return (
    <>

      <h1>This should be protected</h1>

      {user && (
        <p>Welcome, {user.email} and {user.name}</p>
      )}

      <button onClick={logout}>Logout</button>
    </>
  )
}

export default AppPage
