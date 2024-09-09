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
    const [evolutions, setEvolutions] = useState([]);


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
        let pokemonImageLevel1 = await getPokemonImages(pokemonLevel1);
        pokemonEvolutions.push([pokemonLevel1, pokemonImageLevel1]);

        if (data.chain.evolves_to.length !== 0) {
            //buscar nombre del pokemon en el json
            let pokemonLevel2 = data.chain.evolves_to[0].species.name;
            //luego con el nombre llamo a la funcion para conseguir su img
            let pokemonImageLevel2 = await getPokemonImages(pokemonLevel2);
            //agrego el nombre y su img al array
            pokemonEvolutions.push([pokemonLevel2, pokemonImageLevel2]);
            

            if (data.chain.evolves_to[0].evolves_to.length !== 0) {
                let pokemonLevel3 = data.chain.evolves_to[0].
                evolves_to[0].species.name;
                let pokemonImageLevel3 = await getPokemonImages(pokemonLevel3);
                pokemonEvolutions.push([pokemonLevel3, pokemonImageLevel3]);
                //console.log(pokemonEvolutions);
                setEvolutions(pokemonEvolutions);
            }
        }
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