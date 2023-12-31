import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice.js'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { addToCart } from "../slices/cartSlice.js"
import { toast } from 'react-toastify'
import Meta from "../components/Meta"


const ProductScreen = () => {
    const { id: productId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)

    const [createReview, {isLoading: isLoadingProductReview}] = useCreateReviewMutation()
    
    const {userInfo} = useSelector((state) => state.auth)

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success('Avaliação enviada')
            setRating(0)
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Voltar</Link>
            { isLoading ? (
                <Loader />
            ) : error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) : (
            <>
                <Meta title={product.name}/>
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
                                            <Col>Quantidade</Col>
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
                <Row className="review">
                    <Col md={6}>
                        <h2>Avaliações</h2>
                        {product.reviews.length === 0 && <Message>Sem avaliações</Message>}
                        <ListGroup variant="flush">
                            {product.reviews.map(review => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Escreva uma avaliação</h2>
                                {isLoadingProductReview && <Loader />}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating" className="my2">
                                            <Form.Label>Nota</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                                <option value=''>Escolha...</option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                            </Form.Control>                                            
                                        </Form.Group>
                                        <Form.Group controlId="comment" className="my-2">
                                            <Form.Label>Comentário</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button disabled={isLoadingProductReview} type="submit" variant="primary">Enviar</Button>
                                    </Form>
                                ) : (
                                    <Message>
                                    <Link to='/login'>Entre</Link> para deixar uma avaliação{''}
                                    </Message>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>)}
        </>
    )
}

export default ProductScreen