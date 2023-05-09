import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context";
import MealsCard from "../../Components/MealsCard";
import { Button } from "react-bootstrap";
import axios from "../../Axios";
import { LinkContainer } from "react-router-bootstrap";
function Favorites() {
  const { user } = useContext(MyContext);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    //www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    if (user.favorites.length) {
      const requests = user.favorites.map((favorite) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorite}`
        ).then((res) => res.json())
      );
      // console.log(requests)
      Promise.all(requests).then((res) => setFavorites(res));
    }
  }, [user]);
  if (!user.favorites.length) {
    return (
      <div>
        <h2>You don't have any favorites yet</h2>
        <LinkContainer to="/">
          <Button>Please add new one</Button>
        </LinkContainer>
      </div>
    );
  }
  return (
    <div>
      <h2>Your Favorites</h2>
     
      <div className="meals-container">
        {favorites.map(({meals: meal}) => (
          <MealsCard key={meal[0].idMeal} {...meal[0]} />
        ))}
      </div>{" "}
    </div>
  );
}

export default Favorites;
