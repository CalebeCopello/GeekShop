import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

// @desc Fetch all products
// @route GET /api/products
// @acess Public
const getProducts = asyncHandler(async (req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch a product by id
// @route GET /api/products/:id
// @acess Public
const getProductsById = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Recurso não encontrado')
    }
})

// @desc Create products
// @route POST /api/products
// @acess Private/Admin
const createProduct = asyncHandler(async (req,res) =>{
    const product = new Product({
        name: 'Nome de modelo',
        price: 0,
        user: req.user._id,
        image: '/images/Sample.png',
        brande: 'Marca de modelo',
        category: 'Categoria de modelo',
        countInStock: 0,
        numReviews: 0,
        description: 'Descrição de modelo',
    })
    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

export {getProducts, getProductsById, createProduct}