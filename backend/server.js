import express from 'express' // AKA const express = require('express')
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

//constants
const PORT = process.env.PORT || 5000 //whenever you want an variable from .env use the prefix process.env.

connectDB()

const APP = express()

//Body parser middleware

APP.use(express.json())
APP.use(express.urlencoded({extended: true}))

//Cookie parser middleware
APP.use(cookieParser())

APP.get('/', (req, res) => {
    res.send('API is running...')
})

APP.use('/api/products', productRoutes)
APP.use('/api/users', userRoutes)
APP.use('/api/orders', orderRoutes)

APP.use(notFound)
APP.use(errorHandler)

APP.listen(PORT, () => console.log(`Backend server running\nhttp://localhost:${PORT}`))