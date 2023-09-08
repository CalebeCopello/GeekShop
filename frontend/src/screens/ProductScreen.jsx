import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Botton, Button} from 'react-bootstrap'
import Rating from "../components/Rating"
import products from "../products"

const ProductScreen = () => {
    const { id: productID } = useParams()
    const product = products.find((p) => p._id === productID)
    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Voltar</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid className="rounded border border-dark bg-white rounded shadow" />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews}`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <ListGroup.Item>
                                Descrição: <br/> 
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Preço:</Col>
                                    <Col>
                                        <strong>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Situação:</Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'Têm no Estoque' : 'Fora de Estoque'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type='button' disabled={product.countInStock === 0}>Adicionar ao Carrinho</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen