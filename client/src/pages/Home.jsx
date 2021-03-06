import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Footer from "../components/Footer";
import Recomendation from "../components/Home/Recomendation";
import Search from "../components/Home/Search";
import UnderHeader from "../components/Home/UnderHeader";

import { getAllCards } from "../store/actions/cards";

function Home(addToFavorite) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);
  const trends = [
    { type: "design", name: "Дизайн" },
    { type: "programming", name: "Программирование" },
    { type: "marketing", name: "Маркетинг" },
  ];
  return (
    <div className="home_page">
      <Container>
        <UnderHeader />
      </Container>
      <Recomendation />
      <Search addToFavorite={addToFavorite} trends={trends} />
      <Footer />
    </div>
  );
}

export default Home;
