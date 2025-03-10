import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import AccountPage from "./routes/AccountPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface User {
  username: string;
  password: string;
  movies: number[];
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} login={login} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              isAuthenticated ? (
                user ? (
                  <AccountPage
                    user={user}
                    logout={logout}
                    updateUser={updateUser}
                  />
                ) : (
                  <Login setUser={setUser} login={login} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
