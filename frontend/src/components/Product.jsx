import { Card } from "react-bootstrap"

const Product = ({p}) => {
    return (
        <>
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${p._id}`}>
                <Card.Img src={p.image} variant='top' className="border border-dark" />
            </a>
            <Card.Body>
                <a href={`/product/${p._id}`}>
                    <Card.Title ad='div'>
                        <strong>{p.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="h4">
                    R$: {p.price}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Product

