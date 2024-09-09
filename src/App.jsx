import { Button } from "./components/Button";
import { Card } from "./components/Card";
//Styles
import './sass/App.scss'
//Iconos
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState } from "react";

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