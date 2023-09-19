import { useState } from "react"
import { Form, Button, FormSelect } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from "../slices/cartSlice"
import CheckOutSteps from "../components/CheckOutSteps"

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [state, setState] = useState(shippingAddress?.state || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, state, postalCode}))
        navigate('/payment')
    }

    return (
        <>
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Frete</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" className="my-2">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type='text' placeholder="Rua Silva Paes, 042. Apto: 301" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city" className="my-2">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type='text' placeholder="Digite sua Cidade" value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                {/* <Form.Group controlId="state" className="my-2">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control type='text' placeholder="Digite seu Estado" value={state} onChange={(e) => setState(e.target.value)}></Form.Control>
                </Form.Group> */}
                <Form.Group controlId="state" className="my-2">
                    <Form.Label>Estado</Form.Label>
                        <FormSelect value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="Acre - AC">Acre - AC</option>
                        <option value="Alagoas - AL">Alagoas - AL</option>
                        <option value="Amapá - AP">Amapá - AP</option>
                        <option value="Amazonas - AM">Amazonas - AM</option>
                        <option value="Bahia - BA">Bahia - BA</option>
                        <option value="Ceará - CE">Ceará - CE</option>
                        <option value="Distrito Federal - DF">Distrito Federal - DF</option>
                        <option value="Espírito Santo - ES">Espírito Santo - ES</option>
                        <option value="Goiás - GO ">Goiás - GO </option>
                        <option value="Maranhão - MA">Maranhão - MA</option>
                        <option value="Mato Grosso - MT">Mato Grosso - MT</option>
                        <option value="Mato Grosso do Sul - MS">Mato Grosso do Sul - MS</option>
                        <option value="Minas Gerais - MG">Minas Gerais - MG</option>
                        <option value="Pará - PA">Pará - PA</option>
                        <option value="Paraíba - PB">Paraíba - PB</option>
                        <option value="Paraná - PR">Paraná - PR</option>
                        <option value="Pernambuco - PE">Pernambuco - PE</option>
                        <option value="Piauí - PI">Piauí - PI</option>
                        <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
                        <option value="Rio Grande do Norte - RN">Rio Grande do Norte - RN</option>
                        <option value="Rio Grande do Sul - RS">Rio Grande do Sul - RS</option>
                        <option value="Rondônia - RO">Rondônia - RO</option>
                        <option value="Roraima - RR">Roraima - RR</option>
                        <option value="Santa Catarina - SC">Santa Catarina - SC</option>
                        <option value="São Paulo - SP">São Paulo - SP</option>
                        <option value="Sergipe - SE">Sergipe - SE</option>
                        <option value="Tocantins - TO">Tocantins - TO</option>
                    </FormSelect>
                </Form.Group>
                <Form.Group controlId="postaCode" className="my-2">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type='text' placeholder="Digite seu CEP" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                    Continuar
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default ShippingScreen