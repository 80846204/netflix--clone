import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  // Fetch data when the component loads or when fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching URL:", fetchUrl);
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        console.log("Data fetched successfully:", request.data.results);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      {/* Row title */}
      <h2>{title}</h2>

      {/* Row posters */}
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name || movie.title}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
