//Aquí estará la lista de juegos
import React, { useState } from "react";
import Game from "../components/Game";
import { useEffect } from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import useFetchGame from "../hooks/useFetchGame";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function GameList() {
    const navigate = useNavigate();
    const [allGames, setAllGames] = useState([])
    //const [setId, gameData] = useFetchGame("")

    useEffect(() => {
        fetch(`http://localhost:5000/games/all?pag=1&limit=10`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data);
                setAllGames(res.data)
            })
    }, [])

    const handleDetails = (game) => {
        navigate(`/detail?game=${game._id}`)
    }


    //lo de las paginas, puedo devolver la pagina y si la pag es null entonces no enseño el boton
    return (
        <div className="container home">
            <CardGroup>{allGames
                ? allGames.map((game, i) => (
                    <Game key={i} game={game} getDetails={handleDetails} />
                )) : ""}
            </CardGroup>
        </div>
    )
}