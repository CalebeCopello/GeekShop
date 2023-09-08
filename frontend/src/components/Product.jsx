import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({p}) => {
    return (
        <>
        <Card className='my-3 p-3 rounded bg-light shadow' style={{ width: '100%', height: '90%' }}>
            <Link to={`/product/${p._id}`}>
                <Card.Img src={p.image} variant='top' className="rounded border border-dark bg-white" />
            </Link>
            <Card.Body>
                <Link to={`/product/${p._id}`}>
                    <Card.Title as='div'>
                        <strong>{p.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={p.rating} text={`${p.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h6'>
                    {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Product

