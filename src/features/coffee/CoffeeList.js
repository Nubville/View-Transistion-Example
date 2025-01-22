import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectAllCoffees, fetchCoffees } from "./coffeesSlice";

export const CoffeesList = () => {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const dispatch = useDispatch();
  const coffees = useSelector(selectAllCoffees);

  const coffeesStatus = useSelector((state) => state.coffees.status);
  const error = useSelector((state) => state.coffees.error);

  useEffect(() => {
    if (coffeesStatus === "idle") {
      dispatch(fetchCoffees());
    }
  }, [coffeesStatus, dispatch]);

  let content;

  const filterCoffees = selectedIngredient
    ? coffees.filter((coffee) =>
        coffee.ingredients.includes(selectedIngredient)
      )
    : coffees;

  const onFilterChange = (ingredient) => {
    document.startViewTransition
      ? document.startViewTransition(() => {
          //https://react.dev/reference/react-dom/flushSync
          flushSync(() => {
            setSelectedIngredient(ingredient);
          });
        })
      : setSelectedIngredient(ingredient);
    //setSelectedIngredient(ingredient);
  };

  const getAllCoffeesUnquieIngredients = () => {
    return [...new Set(coffees.flatMap((coffee) => coffee.ingredients))];
  };

  if (coffeesStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (coffeesStatus === "succeeded") {
    content = filterCoffees.map((coffee) => (
      <li
        className="coffee-list__list-item"
        key={coffee.id}
        style={{ viewTransitionName: `list-item-${coffee.id}` }}
      >
        <div className="card">
          <h3>
            <Link to={`/coffees/${coffee.id}`} viewTransition>
              {coffee.title}
            </Link>
          </h3>
          <img src={coffee.image} alt={`Image of ${coffee.title}`} />
        </div>
      </li>
    ));
  } else if (coffeesStatus === "error") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Coffees List</h2>
      <label htmlFor="coffee-filter">Ingredient Filter</label>
      <select
        id="coffee-filter"
        onChange={(e) => onFilterChange(e.target.value)}
        defaultValue=""
      >
        <option key="none" value="">
          Select an Ingredient
        </option>
        {getAllCoffeesUnquieIngredients().map((ingredient) => (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <ul className="coffee-list">{content}</ul>
    </section>
  );
};
