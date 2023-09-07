import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Product = ({p}) => {
    return (
        <>
        <Card className='my-3 p-3 rounded bg-light shadow'>
            <Link to={`/product/${p._id}`}>
                <Card.Img src={p.image} variant='top' className="rounded border border-dark bg-white" />
            </Link>
            <Card.Body>
                <Link to={`/product/${p._id}`}>
                    <Card.Title ad='div'>
                        <strong>{p.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="h4">
                    R$: {p.price}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Product

