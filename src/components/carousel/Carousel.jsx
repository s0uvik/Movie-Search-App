import "./Carousel.scss";
import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadingImage/Img";
import Rating from "../rating/Rating";
import PosterFallback from "../../assets/no-poster.png";

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current
    const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
  container.scrollTo({
    left: scrollAmount,
    behavior: "smooth"
  })
  };

  const loadingSkeleton = () => {
    return (
      <div className="skeleton_item">
        <div className="poster_block skeleton">
          <div className="text_block">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="arrow carouselLeftNav"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow carouselRighttNav"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carousel_items"
          ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = url?.poster + item.poster_path || PosterFallback;
              return (
                <div key={item.id}
                 className="carousel_item"
                 onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="poster_block">
                    <Img src={posterUrl} />
                    <Rating rating={item.vote_average.toFixed(1)}/>
                  </div>
                  <div className="text_block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading_skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
