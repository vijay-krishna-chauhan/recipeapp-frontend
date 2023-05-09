import React, { useContext } from "react";
import MyJumbo from "../../Components/Navbar/Jumbo";
import { useEffect, useState } from "react";
import axios from "axios";
import MealsContainer from "../../Components/MealsContainer";
import { MyContext } from "../../Context";

function Home() {
  //const[meals,setMeals]=useState([]);
  const { meals, setMeals } = useContext(MyContext);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setMeals(data.meals);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <MyJumbo />
      <MealsContainer meals={meals} />
    </div>
  );
}

export default Home;
