import { useState, useEffect } from "react";

//sin hacer
const useFetchGame = () => {
    const [gameData, setGameData] = useState([]);
    const [id, setId] = useState("");


    // Recoge la info del juego
    useEffect(() => {
        fetch(`http://localhost:5000/games/detail/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                // return ({
                //     //allPokemonData.push({
                //     name: data.name,
                //     image: data.sprites.other.home.front_default,
                //     price: data.base_experience
                //     //})
                // })
            })
        //setAllData(allPokemonData)
    }, [id]);

    return [setId, gameData];
};

export default useFetchGame;