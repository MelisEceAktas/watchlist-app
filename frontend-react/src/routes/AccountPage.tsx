import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import axios from "axios";
import Alert from "../components/Alert";

interface User {
  _id: string;
  username: string;
  password: string;
  movies: number[];
}

interface Movie {
  id: string;
  title: string;
  genreNames: string[];
  poster_path: string;
  release_date: string;
}

interface Props {
  user: User;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

function AccountPage({ user, logout, updateUser }: Props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        console.log(user.password);
        console.log(user.movies);
        const moviePromises = user.movies.map((id) => fetchMovieById(id));
        const movieData = await Promise.all(moviePromises);
        setMovies(movieData.filter((movie) => movie !== null)); // Remove null values
      } catch (error) {
        setError("Failed to fetch movies.");
      }

      setLoading(false);
    };

    if (user.movies.length > 0) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [user.movies]);

  const fetchMovieById = async (movieId: number) => {
    try {
      console.log(user.username);
      console.log(movieId);
      const response = await axios.get(
        "http://localhost:3000/api/movies/" + movieId
      );

      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error("Movie not found.");
      }
    } catch (error) {
      console.error("Error fetching movie: ", error);
      return null;
    }
  };

  const searchMovie = async (title: string) => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies", {
        params: { title },
      });
      console.log();
      return response.data;
    } catch (error) {
      setError("Movie not found. Please try another title.");
      return null;
    }
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const query = (document.getElementById("searchInput") as HTMLInputElement)
      .value;
    const movie = await searchMovie(query);
    if (movie && !user.movies.some((m) => m === movie.id)) {
      const updatedUser = { ...user, movies: [...user.movies, movie.id] };
      updateUser(updatedUser);
      (document.getElementById("searchInput") as HTMLInputElement).value = "";
    } else {
      setError("Movie already in your list or not found.");
      setAlertVisible(true);
    }

    try {
      const userId = user._id; // Make sure you have the user ID
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/movies`,
        {
          movieId: movie.id, // Sending the movieId in the body
        }
      );

      console.log("✅ Movie added:", response.data);
    } catch (error) {
      console.error("❌ Error adding movie:", error);
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
      <div className="container mt-4">
        <div className="d-flex justify-content-end">
          <Button color="outline-success" onClick={handleLogout}>
            Change Username
          </Button>
          <Button color="outline-success" onClick={handleLogout}>
            Change Password
          </Button>
          <Button color="outline-warning" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="outline-danger" onClick={handleLogout}>
            Delete Account
          </Button>
        </div>
      </div>
      <h3>{user.username}</h3>
      {loading && <p>Loading movies...</p>}
      <form onSubmit={handleAddMovie}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Query"
          />
        </div>
        <button type="submit" className="btn btn-outline-info mb-2">
          Add Movie
        </button>
      </form>
      <h3 className="mb-2">My movies:</h3>
      <div className="container">
        <div className="row flex-nowrap overflow-auto">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col-auto mb-4">
                <div className="card shadow-sm" style={{ width: "16rem" }}>
                  <img
                    src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                    className="card-img-top"
                    alt={movie.title}
                    style={{
                      height: "300px",
                      width: "254px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Genres:</strong>
                      {movie.genreNames}
                    </p>
                    <p className="card-text">
                      <strong>Release Date:</strong> {movie.release_date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No movies added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
