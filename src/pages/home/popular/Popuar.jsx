import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";

function Popular() {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carousel_section">
      <ContentWrapper>
        <span className="carousel_title">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint ={endpoint}/>
    </div>
  );
}

export default Popular;
