import React, { useEffect, useState } from "react";
import MovieApi from "../../api/MovieApi";
import { APIKey } from "../../api/MovieApiKey";
import { useDispatch } from "react-redux";
import { addMovie } from "../../store/Reducer";
import MovieListing from "../MovieListing/MovieListing";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const searchKey = search ? search : "Thor";
      const res = await MovieApi.get(
        `?apikey=${APIKey}&s=${searchKey}&type=movie`
      ).catch((error) => {
        console.log(error);
      });

      setTimeout(() => {
        dispatch(addMovie(res.data.Search));
      }, 500);
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h3 style={{ margin: "1rem 0" }}>Movies</h3>
      <input type="text" placeholder="Search..." />
      <MovieListing />
    </div>
  );
};

export default Home;
