
import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner"
import Popular from "./popular/Popuar";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";

function Home() {
  return (
    <div>
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  );
}

export default Home;
