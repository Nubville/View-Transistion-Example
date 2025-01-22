import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCoffeeById } from "./coffeesSlice";

export const SingleCoffeePage = ({ match }) => {
  const { id } = match.params;

  const coffee = useSelector((state) => selectCoffeeById(state, id));

  if (!coffee) {
    return (
      <section>
        <h2>Coffee not found!</h2>
        <Link to="/">Back to Coffees List</Link>
      </section>
    );
  }

  const ingredients = coffee.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <section>
      <article className="coffee">
        <div className="card card--individual">
          <div className="card__media">
            <img src={coffee.image} alt={`Image of ${coffee.title}`} />
          </div>
          <div className="card__content">
            <h1>{coffee.title}</h1>
            <h2>Description</h2>
            <p>{coffee.description}</p>
            <h2>Ingredients</h2>
            <ul>{ingredients}</ul>
          </div>
        </div>
        <Link to="/">Back to Coffees List</Link>
      </article>
    </section>
  );
};
