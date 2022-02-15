import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../store/actions/cards";
import AddCard from "./AddCard";
import AddCardPromo from "./AddCardPromo";

function CreateCard() {
  const dispatch = useDispatch();

  const [card, setCard] = useState({
    title: "",
    text: "",
    type: "design",
    image: null,
  });
  const [will, setWill] = useState([]);

  const [cardPromo, setCardPromo] = useState({
    promoTitle: "",
    promoSubtitle: "",
    price: "",
    willLearn: [],
    description: "",
    willLearnStr: "",
  });
  const addToWillLearn = () => {
    setWill([...will, cardPromo.willLearnStr]);
    setCardPromo({ ...cardPromo, willLearnStr: "" });
  };

  const createCard = () => {
    dispatch(
      addCard(
        card.title,
        card.text,
        card.type,
        card.image,
        cardPromo.promoTitle,
        cardPromo.promoSubtitle,
        cardPromo.price,
        will,
        cardPromo.description
      )
    );
  };
  return (
    <div className="addCard_form d-flex flex-column justify-content-center col-md-8 ">
      <AddCard setCard={setCard} form={card} />
      <AddCardPromo
        setWill={setWill}
        will={will}
        addToWillLearn={addToWillLearn}
        setForm={setCardPromo}
        form={cardPromo}
      />
      <div className="w-100 justify-content-center text-center">
        <button onClick={createCard} className="btn mt-3 mb-4 w-50 ">
          Создать
        </button>
      </div>
    </div>
  );
}

export default CreateCard;