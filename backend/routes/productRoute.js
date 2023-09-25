import express from "express";
const router = express.Router()
import {createProduct, getProducts, getProductsById} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductsById)

export default router