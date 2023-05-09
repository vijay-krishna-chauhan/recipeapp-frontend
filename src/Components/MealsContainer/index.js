import React from "react";
import "./style.css";
import MealsCard from "../MealsCard";

export default function MealsContainer({ meals }) {
  if (meals) {
    return (
      <div className="meals-container">
        {meals.map((meal) => (
          <MealsCard key={meal.idMeal} {...meal} />
        ))}
      </div>
    );
  }
}
