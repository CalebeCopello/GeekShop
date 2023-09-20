import { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import{Form,Button,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    },[shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <>
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Forma de Pagamento</h1>
            <Form onSubmit={ submitHandler }>
                <Form.Group>
                    <Form.Label as='legend'>Escolha a Forma:</Form.Label>
                    <Col>
                        <Form.Check type="radio" className="my-2" label='PayPal ou Cartão de Crédito' id='Paypal' name="paymentMethod" value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen