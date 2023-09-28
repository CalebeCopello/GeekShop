import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {useGetTopProductsQuery} from '../slices/productsApiSlice'

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery()

    return (
    isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-primary mb-4'>
            {products.map((p) => (
                <Carousel.Item key={p._id}>
                    <Link to={`/product/${p._id}`}>
                        <Image src={p.image} alt={p.name} fluid style={{backgroundColor: 'white', alignContent: 'center'}} />
                        <Carousel.Caption className='carrousel-caption'>
                            <h2>{p.name} ({p.price?.toLocaleString('pt-bt', {style:'currency', currency:'BRL'})})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel> 
    )
    )
}

export default ProductCarousel