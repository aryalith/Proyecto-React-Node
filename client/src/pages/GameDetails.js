//aqui cada juego individual
import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export default function GameDetails() {
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("game");
    const [game, setGame] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/games/detail/${id}`)
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {
                console.log(res.title);
                setGame(res);

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
    //ya tengo el item
    return (
        <div className="container home">
            <Container>
                <div className="details">
                    <div>
                        <img src={game.image} alt={game.title} />
                    </div>
                    <div className="game-details">
                        <h3>{game.title}</h3>
                        <p><span>Genre: </span>{game.genre}</p>
                        <p><span>Developer: </span>{game.developer}</p>
                        <p><span>Release Date: </span>{game.release_date}</p>
                        <p><span>Avaiable platforms: </span>{game.platform}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}