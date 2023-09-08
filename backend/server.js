import express from 'express' // AKA const express = require('express')
import products from './data/products.js' // since it's my own js module I have to put .js

//constants
const PORT = 5000
const APP = express()

APP.get('/', (req, res) => {
    res.send('API is running...')
})

APP.get('/api/products', (req,res) =>{
    res.json(products)
})

APP.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

APP.listen(PORT, () => console.log(`Server running\nhttp://localhost:${PORT}`))