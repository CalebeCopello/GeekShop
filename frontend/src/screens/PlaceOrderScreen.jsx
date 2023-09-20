import { useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {toast} from 'react-toastify'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import {clearCartItems} from '../slices/cartSlice'

const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <>
        <CheckOutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Entrega</h2>
                        <p>
                            <strong>Endereço: </strong>
                            {cart.shippingAddress.address}<br/> {cart.shippingAddress.city} <br/> {cart.shippingAddress.state} <br/> {cart.shippingAddress.postalCode}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Forma de Pagamento</h2>
                        <strong>Forma: </strong> {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Lista de Items</h2>
                        {cart.cartItems.length === 0 ? (<Message>Seu Carrinho está vazio.</Message>) : (
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded className="rounded border border-dark bg-white rounded shadow"/>
                                            </Col>
                                            <Col>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={6}>
                                                {item.qty} x {item.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })} = {(item.qty * item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Resumo do Pedido</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items: </Col>
                                <Col>{cart.itemsPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Frete: </Col>
                                <Col>{cart.shippingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>{cart.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                                Finalizar Compra
                            </Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default PlaceOrderScreen