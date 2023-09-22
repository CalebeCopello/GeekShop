import { Link, useParams } from "react-router-dom"
import { Row,Col,ListGroup,Image,Form,Button,Card } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice"

const OrderScreen = () => {
    const { id: orderId } = useParams()

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    return isLoading ? <Loader /> : error ? <Message variant='danger' /> : (
        <>
        <h1>Pedido {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Frete</h2>
                        <p>
                            <strong>Nome:</strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {order.user.email}
                        </p>
                        <p>
                            <strong>Endereço: </strong><br/>
                            {order.shippingAddress.address}<br/> {order.shippingAddress.city} <br/> {order.shippingAddress.state} <br/> {order.shippingAddress.postalCode}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Entregue em: {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='danger'>Não Entregue</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Forma de Pagamento</h2>
                        <p>
                            <strong>Forma:</strong> {order.paymentMethod}
                        </p>
                        {order.isPaid? (
                            <Message variant='success'>Pago em: {order.paidAt}</Message>
                        ) : (
                            <Message variant='danger'>Não Pago</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Items Comprados</h2>
                        {order.orderItems.map((item, index) =>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded className="rounded border border-dark bg-white rounded shadow"/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={6}>
                                        {item.qty} x {item.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })} = {(item.qty * item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                                    </Col>
                                </Row>
                            </ListGroup.Item>    
                        ))}
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
                                <Col>{order.itemsPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                            <Row>
                                <Col>Frete: </Col>
                                <Col>{order.shippingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                            <Row>
                                <Col>Total: </Col>
                                <Col>{order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/*TODO: PAY ORDER PLACEHOLDER */}
                        {/*TODO: MARK AS DELIVERED PLACEHOLDER */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default OrderScreen