import path from 'path'
import express from 'express' // AKA const express = require('express')
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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
APP.use('/api/upload', uploadRoutes)

APP.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve()
APP.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    APP.use(express.static(path.join(__dirname, '/frontend/build')))

    APP.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    APP.get('/', (req, res) => {
        res.send('API is running...')
    })
}

APP.use(notFound)
APP.use(errorHandler)

APP.listen(PORT, () => console.log(`Backend server running\nhttp://localhost:${PORT}`))