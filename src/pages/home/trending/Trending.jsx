import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./Trending.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";

function Trending() {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "day" ? "day" : "week");
  };

  return (
    <div className="carousel_section">
      <ContentWrapper>
        <span className="carousel_title">Trending</span>
        <SwitchTabs data={["day", "week"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
}

export default Trending;
