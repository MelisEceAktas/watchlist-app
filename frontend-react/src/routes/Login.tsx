import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import { Button } from "../components/Button";

interface User {
  _id: string;
  username: string;
  password: string;
  movies: number[];
}

interface Props {
  login: () => void;
  setUser: (user: User) => void;
}

function Login({ setUser, login }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const username = (
      document.getElementById("usernameInput") as HTMLInputElement
    ).value;
    const password = (
      document.getElementById("passwordInput") as HTMLInputElement
    ).value;

    try {
      console.log(username);
      console.log(password);
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { username, password }
      );
      login();
      setUser(response.data);
      navigate("/account");
    } catch (error: any) {
      setError(error.response?.data?.error || "Login failed");
      setAlertVisible(true);
    }
  };

  return (
    <div>
      {alertVisible && (
        <Alert color="danger" onClose={() => setAlertVisible(false)}>
          <div>
            <strong>{error}</strong>
          </div>
        </Alert>
      )}
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1 className="mb-3">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-info">
            Login
          </button>
        </form>
        <Link to="/signup">
          <Button color="outline-info" onClick={() => {}}>
            Don't have an account?
          </Button>
        </Link>
        <Link to="/">
          <Button color="outline-info" onClick={() => {}}>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
