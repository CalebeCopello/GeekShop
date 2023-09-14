import express from 'express' // AKA const express = require('express')
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'

//constants
const PORT = process.env.PORT || 5000 //whenever you want an variable from .env use the prefix process.env.

connectDB()

const APP = express()

APP.get('/', (req, res) => {
    res.send('API is running...')
})

APP.use('/api/products', productRoutes)
APP.use('/api/users', userRoutes)

APP.use(notFound)
APP.use(errorHandler)

APP.listen(PORT, () => console.log(`Backend server running\nhttp://localhost:${PORT}`))