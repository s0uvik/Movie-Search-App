import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu((prev) => !prev);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false)
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className={`header ${mobileMenu ? "mobile_view" : ""} ${show}`}>
      <ContentWrapper className="contentWrapper">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" />
          <h2>Appna Movie</h2>
        </div>
        <ul className="menu_items">
          <li
            className="menu_item"
            onClick={() => {
              navigate("/explore/movie");
              setMobileMenu(false);
            }}
          >
            Movies
          </li>

          <li
            className="menu_item"
            onClick={() => {
              navigate("/explore/tv");
              setMobileMenu(false);
            }}
          >
            Tv Shows
          </li>
          <li className="menu_item">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <ul className="mobile_menu_items">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={openMobileMenu} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </ul>
      </ContentWrapper>
      {showSearch && (
        <div className="searchbar">
          <ContentWrapper>
            <div className="search_input">
              <input
                type="text"
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search for a movie or TV show..."
              />
              <button onClick={() => setShowSearch(false)}>X</button>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
