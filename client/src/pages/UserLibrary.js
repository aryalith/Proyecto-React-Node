
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Game from "../components/Game";
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserLibrary = () => {
    const auth = useAuth();
    const [username, setusername] = useState("");
    const [games, setGames] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/user/library`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },

        })
            .then((res) => res.json())
            .then((res) => {
                setusername(res.user);
                setGames(res.data);
            })

    }, [auth.token]);

    const handleDetails = (game) => {
        navigate(`/detail?game=${game._id}`)
    }

    return (
        <div className="container home">
            <h2 className="welcome"> {username}'s Library</h2>
            <h4>Games Completed</h4>
            <Row className='row-cols-1 row-cols-md-5 g-4 listsGames'>
                {!games.games_completed ?
                    "" :
                    games.games_completed.length > 0 ?
                        games.games_completed.map((game, i) => (
                            <Col>
                                <Game key={i} game={game} getDetails={handleDetails} />
                            </Col>
                        )) :
                        <p>No games completed</p>}
            </Row>
            <h4>Games Playing</h4>
            <Row className='row-cols-1 row-cols-md-5 g-4 listsGames'>
                {!games.games_playing ?
                    "" :
                    games.games_playing.length > 0 ?
                        games.games_playing.map((game, i) => (
                            <Col>
                                <Game key={i} game={game} getDetails={handleDetails} />
                            </Col>
                        )) :
                        <p>No games playing</p>}
            </Row>
            <h4>Games Pending</h4>
            <Row className='row-cols-1 row-cols-md-5 g-4 listsGames'>
                {!games.games_pending ?
                    "" :
                    games.games_pending.length > 0 ?
                        games.games_pending.map((game, i) => (
                            <Col>
                                <Game key={i} game={game} getDetails={handleDetails} />
                            </Col>)) :
                        <p>No games pending</p>}
            </Row>
        </div>
    );
};

export default UserLibrary;