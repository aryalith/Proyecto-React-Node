import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import useFetchGame from '../hooks/useFetchGame';



export default function Game({ game, getDetails }) {
    // const navigate = useNavigate();
    // const detailedGame = () => {
    //     setId
    //     navigate('/')
    //     console.log(`funciona ${game._id}`);
    // }
    return (

        <Card className='game' onClick={() => getDetails(game)} >
            <div className='overlay'></div><p className='overlay-title'>{game.title}</p>
            <Card.Img variant="top" src={game.image} className='game-img' />

            <Card.Footer>
                {/* <small className="text-muted">{game.genre}</small> */}
                <Badge bg="secondary" className='genre'>{game.genre}</Badge>
                <Badge bg="secondary" className='platform'>{game.platform}</Badge>
            </Card.Footer>
        </ Card>

    );
}