import { useState } from "react"
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => { 
        e.preventDefault()
        console.log('submit')
    }
    return (
        <>
        <FormContainer>
            <h1>Entrar</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Endereço de E-mail</Form.Label>
                    <Form.Control type='email' placeholder="Coloque seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Coloque seu Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">
                    Entrar
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Cliente Novo? <Link to='/register'>Registrar-se</Link>
                </Col>
            </Row>
        </FormContainer>
        </>
    )
}

export default LoginScreen