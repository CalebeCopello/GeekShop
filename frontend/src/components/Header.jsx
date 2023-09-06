import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
    return(
        <header>
            <Navbar bg='dark' variant='dark' expand='sm' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>GeekShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/cart'><FaShoppingCart /> Carrinho</Nav.Link>
                            <Nav.Link href='/login'><FaUser /> Logar-se</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header