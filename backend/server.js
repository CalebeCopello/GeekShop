import express from 'express' // AKA const express = require('express')

//constants
const PORT = 5000
const APP = express()

APP.get('/', (req, res) => {
    res.send('API is running...')
})

APP.listen(PORT, () => console.log(`Server running\nhttp://localhost:${PORT}`))