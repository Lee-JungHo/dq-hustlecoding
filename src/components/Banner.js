import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useEffect, useState } from "react";
import axios from "../API/axios";
import requests from "../API/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchDQsPick, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      //Give to our movie hook one of all the movies randomly
      setMovie(
        request.data.result[
          Math.floor(Math.random() * request.data.result.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.poster_path}"
                    )`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        {/**Title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">
            <PlayArrowIcon />
            Play
          </button>
          {/* <button className="banner__button info"><InfoOutlinedIcon fontSize="small"  paddingRight={20} marginRight={100}/><div className="space"></div> More Information</button> */}
        </div>
        {/**DIV > 2 BUTTONS */}

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        {/*Description*/}
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
