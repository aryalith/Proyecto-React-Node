import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';



export default function Game({ game, getDetails }) {
    return (
        <Card className='game' onClick={() => getDetails(game)} >
            <div className='overlay'></div><p className='overlay-title'>{game.title}</p>
            <Card.Img variant="top" src={game.image} className='game-img' />
            <Card.Footer>
                <Badge bg="secondary" className='genre'>{game.genre}</Badge>
                <Badge bg="secondary" className='platform'>{game.platform}</Badge>
            </Card.Footer>
        </Card>

    );
}