import {Helmet} from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
    return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Bem vindo ao GeekShop',
    description: 'Nós vendemos os melhores itens do seu jogo favorito',
    keywords: 'Games, shop, buy game items'
}

export default Meta