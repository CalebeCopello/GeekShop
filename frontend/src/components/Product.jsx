import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({product}) => {
    return (
        <>
        <Card className='my-3 p-3 rounded bg-light shadow'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' className="rounded border border-dark bg-white" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h6'>
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Product

