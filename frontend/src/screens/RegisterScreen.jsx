import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get(('redirect')) || '/'

    useEffect(() =>{
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => { 
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords são diferentes')
            return
        } else {
            try {
                const res = await register({name, email, password}).unwrap()
                dispatch(setCredentials({...res, }))
                navigate(redirect)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <>
        <FormContainer>
            <h1>Registrar</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type='text' placeholder="Coloque seu Nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Endereço de E-mail</Form.Label>
                    <Form.Control type='email' placeholder="Coloque seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type='password' placeholder="Coloque sua Senha" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>Confirme sua Senha</Form.Label>
                    <Form.Control type='password' placeholder="Confirme sua Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Registrar
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Já tem uma Conta? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Entrar</Link>
                </Col>
            </Row>
        </FormContainer>
        </>
    )
}

export default RegisterScreen