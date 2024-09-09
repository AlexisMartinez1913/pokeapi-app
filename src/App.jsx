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
    const [pokemonName, setPokemonName] = useState('');


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

    }, [pokemonId])

    async function getEvolutions(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
        //console.log(response);
        const data = await response.json();
        //console.log(data.chain.species.name);
        setPokemonName(data.chain.species.name);
        let pokemonEvolutions = [];

        let pokemonLevel1 = data.chain.species.name;
        let pokemonImageLevel1 = getPokemonImages(pokemonLevel1);
        pokemonEvolutions.push(pokemonLevel1, pokemonImageLevel1);
    }

    async function getPokemonImages(name) {
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const data = await response.json();
        return data.sprites.other['official-artwork'].front_default;
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
                {pokemonName}
                <Button 
                icon={<TiArrowRightOutline />} 
                handleClick={nextClick} 
                />
            </div>

        </>
    )
}

export { App }