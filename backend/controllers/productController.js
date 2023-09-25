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
        name: 'Nome modelo',
        price: 0,
        user: req.user._id,
        image: '/images/Sample.png',
        brand: 'Marca modelo',
        category: 'Categoria modelo',
        countInStock: 0,
        numReviews: 0,
        description: 'Descrição modelo',
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @acess Private/Admin
const updateProduct = asyncHandler(async (req,res) =>{
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Recurso não encontrado')
    }
})

export {getProducts, getProductsById, createProduct, updateProduct}