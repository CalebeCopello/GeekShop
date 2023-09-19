import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckOutSteps = ({step1, step2, step3, step4}) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Logar-se</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Logar-se</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Frete</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Frete</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Pagamento</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Pagamento</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Efetuar Compra</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Efetuar Compra</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    ) 
}

export default CheckOutSteps