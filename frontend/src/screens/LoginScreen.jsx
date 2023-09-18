import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get(('redirect')) || '/'

    useEffect(() =>{
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = async (e) => { 
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap()
            dispatch(setCredentials({...res, }))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
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
                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Entrar
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Cliente Novo? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Registrar-se</Link>
                </Col>
            </Row>
        </FormContainer>
        </>
    )
}

export default LoginScreen