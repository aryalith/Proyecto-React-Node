import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useAuth } from "../context/AuthProvider";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function GameDetails() {
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("game");
    const [game, setGame] = useState({});
    const [info, setInfo] = useState("");
    const user = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/games/detail/${id}`)
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {
                setGame(res);
            })
    }, [id]);


    const handleDelete = async () => {

        try {
            const res = await fetch(`http://localhost:5000/games/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });
            const text = await res.json();
            console.log(text);

            setInfo(text.message);
            navigate("/allgames");
        } catch (error) {
            console.error('Error fetching data:', error);
            setInfo(error)
        }

    }

    const handleAddToCompleted = async () => {
        try {
            const res = await fetch(`http://localhost:5000/user/addGameCompleted/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });
            const text = await res.json();
            let newData = JSON.parse(localStorage.getItem("userData"));
            newData.games_completed.push(id);
            localStorage.setItem("userData", JSON.stringify(newData));
            console.log(text);
            setInfo(text.message);
        } catch (error) {
            console.error('Error fetching data:', error);
            setInfo(error)

        }
    }
    const handleAddToPlaying = async () => {
        try {
            const res = await fetch(`http://localhost:5000/user/addGamePlaying/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });
            const text = await res.json();
            let newData = JSON.parse(localStorage.getItem("userData"));
            newData.games_playing.push(id);
            localStorage.setItem("userData", JSON.stringify(newData));
            console.log(text);
            setInfo(text.message);
        } catch (error) {
            console.error('Error fetching data:', error);
            setInfo(error)

        }
    }
    const handleAddToPending = async () => {
        try {
            const res = await fetch(`http://localhost:5000/user/addGamePending/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });
            const text = await res.json();
            let newData = JSON.parse(localStorage.getItem("userData"));
            newData.games_pending.push(id);
            localStorage.setItem("userData", JSON.stringify(newData));
            console.log(text);
            setInfo(text.message);
        } catch (error) {
            console.error('Error fetching data:', error);
            setInfo(error)

        }
    }
    const handleRemove = async (library) => {
        try {
            const res = await fetch(`http://localhost:5000/user/deleteGame/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const text = await res.json();
            let newData = JSON.parse(localStorage.getItem("userData"));
            newData[library] = newData[library].filter((i) => i !== id);
            localStorage.setItem("userData", JSON.stringify(newData));
            setInfo(text.message);
        } catch (error) {
            console.error('Error fetching data:', error);
            setInfo(error)
        }
    }

    return (
        <div className="container home">
            <Container>
                <div className="details">
                    <div>
                        <img className="game-img2" src={game.image} alt={game.title} />
                    </div>
                    <div className="game-details">
                        <h3>{game.title}</h3>
                        <p><span>Genre: </span>{game.genre}</p>
                        <p><span>Developer: </span>{game.developer}</p>
                        <p><span>Release Date: </span>{game.release_date}</p>
                        <p><span>Avaiable platforms: </span>{game.platform}</p>
                        <p className="infogame">{info}</p>
                        <div>
                            {!user.token ?
                                "" :
                                JSON.parse(localStorage.getItem("userData")).games_completed.includes(id) ?
                                    <Button variant="primary" onClick={() => handleRemove("games_completed")}>Completed x</Button> :
                                    JSON.parse(localStorage.getItem("userData")).games_playing.includes(id) ?
                                        <Button variant="primary" onClick={() => handleRemove("games_playing")}>Playing x</Button> :
                                        JSON.parse(localStorage.getItem("userData")).games_pending.includes(id) ?
                                            <Button variant="primary" onClick={() => handleRemove("games_pending")}>Pending x</Button> :
                                            <>
                                                <Button variant="primary" onClick={handleAddToCompleted}>Add to Completed</Button>
                                                <Button variant="primary" onClick={handleAddToPlaying}>Add to Playing</Button>
                                                <Button variant="primary" onClick={handleAddToPending}>Add to Pending</Button>
                                            </>
                            }
                        </div>
                        <div>
                            {user.role === "admin" ?
                                <Button variant="danger" onClick={handleDelete}>Delete Game</Button> : ""
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}