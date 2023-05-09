import React, { useContext, useState } from 'react'
import './style.css';
import {InputGroup,FormControl} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { MyContext } from '../../../Context';
import axios from 'axios';

export default function MyJumbo(){

     const[searchInput, setSearchInput]=useState('');
     const {setMeals}=useContext(MyContext);

    function handleSearch(){
        if (searchInput.trim() !== "") { // check if input is not empty or whitespace
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then((res)=>res.json())
            .then((data) => setMeals(data.meals));
        }
        // axios
        // .get(
        //     `https:www.themealdb.com/api/json/v1/1/search.php?s= ${searchInput}`
        //     //'https:www.themealdb.com/api/json/v1/1/search.php?s=pizza'
        //     )
        // .then(({data})=>setMeals(data.meals));
    }

    return <div className="jumbo">
        <h1>Welcome</h1>
        <h3>You can search your favourite meals</h3>
        <div className='button-input'>
            <InputGroup className="mb-3 ">
            <FormControl
           // placeHolder="Search for a meals"
            aria-label="Meal Search Input"
            aria-describedby="meal-search-button"
            value={searchInput}
            onChange={(e)=> setSearchInput(e.target.value)}
            />
            <Button variant="danger" id="meal-search-button" onClick={handleSearch}>
                Button
            </Button>
        </InputGroup>
        </div>
        
    </div>
}   