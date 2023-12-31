import { useLocation, useParams } from "react-router-dom";
import "./Details.scss";
import useFetch from "../../hooks/useFetch"
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import { useEffect } from "react";

function Details() {

  const {mediaType, id} = useParams()
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  
const {location} = useLocation()

useEffect(() => {
  window.scrollTo(0, 0);
}, [location]);

  return <div>
    <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
    <Cast data={credits?.cast} loading={creditsLoading}/>
    <VideoSection data={data} loading={loading}/>
    <Similar mediaType={mediaType} id={id}/>
    <Recommendation mediaType={mediaType} id={id}/>
  </div>;
}

export default Details;
