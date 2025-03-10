import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const Welcome: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Movie Watchlist</h1>
      <p>Please login or sign up to continue.</p>
      <Link to="/login">
        <Button color="outline-info" onClick={() => {}}>
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button color="outline-info" onClick={() => {}}>
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default Welcome;
