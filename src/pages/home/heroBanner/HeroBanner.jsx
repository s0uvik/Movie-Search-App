import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./HeroBanner.scss"

import Img from "../../../components/lazyLoadingImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const url = useSelector((state) => state.home.url);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data, url]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="hero_banner">
      {!loading && (
        <div className="backdrop_img">
          <Img src={background} className="img" />
        </div>
      )}
      <div className="opacity_layer"></div>
      <ContentWrapper>
        <div className="hero_banner_content">
          <span className="title">Welcome</span>
          <span className="sub_title">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="search_input">
            <input
              type="text"
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search for a movie or TV show..."
            />
            <button onClick={() => searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
