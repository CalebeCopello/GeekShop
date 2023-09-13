import { Link, useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message.jsx'
import { addToCart } from '../slices/cartSlice.js'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart

    const addToCartHandler = async (p,qty) => {
        dispatch(addToCart({...p, qty}))
    }

    return (
        <>
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px'}}>Carrinho de Compras</h1>
                { cartItems.length === 0 ? (
                    <Message variant='danger'>
                        O carrinho está vazio <Link to='/'>Voltar</Link>
                    </Message>
                ):(
                    <ListGroup variant='flush'>
                        {cartItems.map((i) =>(
                            <ListGroup.Item key={i._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={ i.image} alt={i.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${i._id}`}>{i.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {i.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={i.qty} onChange={(e) => addToCartHandler(i, Number(e.target.value))}>
                                            {[...Array(i.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='danger'>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({ cartItems.reduce((a,i) => a +i.qty,0)})</h2>
                            {cartItems.reduce((a,i) => a+i.qty * i.price,0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                                Finalizar Compra
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default CartScreen