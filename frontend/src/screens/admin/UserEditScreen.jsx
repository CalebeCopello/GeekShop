import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../../slices/userApiSlice'

const UserEditScreen = () => {
    const {id: userId } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId)

    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation()

    const navigate = useNavigate()

    useEffect(() => { 
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          await updateUser({userId, name, email, isAdmin})
          toast.success('Usuário atualizado com sucesso')
          refetch()
          navigate('/admin/userlist')
        } catch (err) {
          toast.error(err?.data?.message || err.message)
        }
    }


    return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Voltar
    </Link>
    <FormContainer>
        <h1>Editar Usuário</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type='text' placeholder='Nome do Usuário' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type='text' placeholder='E-mail do Usuário' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin' className='my-2'>
                  <Form.Check type='checkbox' label='É Administrador' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>
                    Atualizar
                </Button>
            </Form>
        )}
    </FormContainer>
    </>
    )
}

export default UserEditScreen