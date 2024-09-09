import { Button } from "./components/Button"
import './sass/App.scss'
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
import { useState } from "react";

const App = () => {

    const [pokemonId, setPokemonId] = useState(1)

    return (
        <>
            {/*Tarjetas */}

            <div className="button-container">
                <Button 
                icon={<TiArrowLeftOutline />} 
                handleClick={() => {
                    if (pokemonId === 1) {
                        setPokemonId(1)
                    } else {
                        setPokemonId(pokemonId - 1);
                    }
                }} />
                {pokemonId}
                <Button 
                icon={<TiArrowRightOutline />} 
                handleClick={() => {
                    setPokemonId(pokemonId +1)
                }
                    } />
            </div>

        </>
    )
}

export { App }