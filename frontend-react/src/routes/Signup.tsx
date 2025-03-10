import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { Button } from "../components/Button";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

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
      const response = await axios.post("http://localhost:3000/api/users", {
        username,
        password,
      });
      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.error || "Signup failed");
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
        <h1 className="mb-3">Sign Up</h1>
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
            Sign Up
          </button>
        </form>
        <Link to="/login">
          <Button color="outline-info" onClick={() => {}}>
            Already have an account?
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

export default Signup;
