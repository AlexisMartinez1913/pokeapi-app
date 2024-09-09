import { Button } from "./components/Button";
import { Card } from "./components/Card";
//Styles
import './sass/App.scss'
//Iconos
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState, useEffect } from "react";

const App = () => {

    const [pokemonId, setPokemonId] = useState(1);

    const previewClick = () => {
        if (pokemonId === 1) {
            setPokemonId(1);
        } else {
            setPokemonId(pokemonId - 1);
        }
    };

    const nextClick = () => {
        setPokemonId(pokemonId + 1);
    };

    //Consumir la api
    useEffect(() => {
        getEvolutions(pokemonId);

    })

    async function getEvolutions(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
        console.log(response);
    }

    return (
        <>
            <div className="card-container">
                <Card />

            </div>

            <div className="button-container">
                <Button 
                icon={<TiArrowLeftOutline />} 
                handleClick={previewClick} 
                />
                {pokemonId}
                <Button 
                icon={<TiArrowRightOutline />} 
                handleClick={nextClick} 
                />
            </div>

        </>
    )
}

export { App }