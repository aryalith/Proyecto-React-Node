import React, { useState } from "react";
import Game from "../components/Game";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function GameList() {
    const navigate = useNavigate();
    const [allGames, setAllGames] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:5000/games/all?pag=${page}&limit=10`)
            .then((res) => res.json())
            .then((res) => {
                setAllGames(res.data)
            })
    }, [page])

    const handleDetails = (game) => {
        navigate(`/detail?game=${game._id}`)
    }

    const handleNextPage = () => {
        if (page > (allGames.length % 10)) {
            console.log(page);

            let newPage = page + 1;
            setPage(newPage)
        }
    }

    const handlePrevPage = () => {
        let newPage = page - 1;
        setPage(newPage)
    }


    return (
        <div className="container library">{allGames ?
            <Row className='row-cols-1 row-cols-md-5 g-4'>{allGames
                ? allGames.map((game, i) => (
                    <Col>
                        <Game key={i} game={game} getDetails={handleDetails} />
                    </Col>
                )) : ""}
            </Row> : ""}
            {!allGames ?
                "" :
                <div className="page-btns">{page === 1 ?
                    "" :
                    <Button variant="secondary" onClick={handlePrevPage}>Previous Page</Button>
                }
                    <Button variant="secondary" onClick={handleNextPage}>Next Page</Button>
                </div>}
        </div>
    )
}