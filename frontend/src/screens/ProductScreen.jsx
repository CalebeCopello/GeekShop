import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import { useDispatch } from "react-redux"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from '../slices/productsApiSlice.js'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { addToCart } from "../slices/cartSlice.js"


const ProductScreen = () => {
    const { id: productId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
    
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Voltar</Link>
            { isLoading ? (
                <Loader />
            ) : error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) : (<>
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
                                <span>{product.description}</span>
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
                                        <strong>
                                        {
                                            // product.price 
                                            product.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }) 
                                        }
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Situação:</Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'Em Estoque' : 'Fora de Estoque'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qunatidade</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button className="btn-block" type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Adicionar ao Carrinho</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>)}
        </>
    )
}

export default ProductScreen