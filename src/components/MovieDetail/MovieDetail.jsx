import React, { useState, useEffect } from "react";
import "./MovieDetail.scss";
import MovieApi from "../../api/MovieApi";
import { APIKey } from "../../api/MovieApiKey";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await MovieApi.get(
        `?apikey=${APIKey}&i=${id}&plot=full`
      ).catch((error) => {
        console.log("Error ", error);
      });
      setMovie(res.data);
      setLoading(true);
    };
    fetchDetail();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="movie-detail-con">
          <div className="movie-detail-img">
            <img src={movie.Poster} alt="" />
          </div>
          <div className="movie-detail-info"></div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default MovieDetail;
